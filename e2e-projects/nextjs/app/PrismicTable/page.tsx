import { isFilled } from "@prismicio/client";
import { PrismicTable } from "@prismicio/react";
import assert from "assert";

import { createClient } from "@/prismicio";

export default async function Page() {
	const client = await createClient();
	const { data: tests } = await client.getSingle("table_test");

	assert(isFilled.table(tests.filled));
	assert(!isFilled.table(tests.empty));

	return (
		<>
			<div data-testid="filled">
				<PrismicTable field={tests.filled} />
			</div>

			<div data-testid="empty">
				<PrismicTable field={tests.empty} />
			</div>

			<div data-testid="fallback">
				<PrismicTable field={tests.empty} fallback={<div>Table</div>} />
			</div>

			<div data-testid="custom-table">
				<PrismicTable
					field={tests.filled}
					components={{
						table: ({ children }) => <div className="table">{children}</div>,
						thead: ({ children }) => <div className="head">{children}</div>,
						tbody: ({ children }) => <div className="body">{children}</div>,
						tr: ({ children }) => <div className="row">{children}</div>,
						th: ({ children }) => <div className="header">{children}</div>,
						td: ({ children }) => <div className="data">{children}</div>,
					}}
				/>
			</div>

			<div data-testid="custom-cell-content">
				<PrismicTable
					field={tests.filled}
					components={{
						table: ({ children }) => (
							<table className="table">{children}</table>
						),
						paragraph: ({ children }) => (
							<p className="paragraph">{children}</p>
						),
						strong: ({ children }) => (
							<span className="strong">{children}</span>
						),
						em: ({ children }) => <span className="em">{children}</span>,
					}}
				/>
			</div>
		</>
	);
}
