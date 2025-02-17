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
						head: ({ children }) => <div className="head">{children}</div>,
						body: ({ children }) => <div className="body">{children}</div>,
						row: ({ children, key }) => (
							<div className="row" key={key}>
								{children}
							</div>
						),
						header: ({ children, key }) => (
							<div className="header" key={key}>
								{children}
							</div>
						),
						data: ({ children, key }) => (
							<div className="data" key={key}>
								{children}
							</div>
						),
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
