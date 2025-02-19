import { ReactNode } from "react";
import {
	isFilled,
	TableField,
	TableFieldHead,
	TableFieldHeadRow,
	TableFieldBody,
	TableFieldBodyRow,
	TableFieldHeaderCell,
	TableFieldDataCell,
} from "@prismicio/client";

import { JSXMapSerializer, PrismicRichText } from "./PrismicRichText.js";

type TableComponents = {
	table?: (props: {
		table: TableField<"filled">;
		children: ReactNode;
	}) => ReactNode;
	thead?: (props: { head: TableFieldHead; children: ReactNode }) => ReactNode;
	tbody?: (props: { body: TableFieldBody; children: ReactNode }) => ReactNode;
	tr?: (props: {
		row: TableFieldHeadRow | TableFieldBodyRow;
		children: ReactNode;
	}) => ReactNode;
	th?: (props: {
		cell: TableFieldHeaderCell;
		children: ReactNode;
	}) => ReactNode;
	td?: (props: { cell: TableFieldDataCell; children: ReactNode }) => ReactNode;
};

const defaultComponents: Required<TableComponents> = {
	table: ({ children }) => <table>{children}</table>,
	thead: ({ children }) => <thead>{children}</thead>,
	tbody: ({ children }) => <tbody>{children}</tbody>,
	tr: ({ children }) => <tr>{children}</tr>,
	th: ({ children }) => <th>{children}</th>,
	td: ({ children }) => <td>{children}</td>,
};

export type PrismicTableProps = {
	field: TableField;
	components?: JSXMapSerializer & TableComponents;
	fallback?: ReactNode;
};

export function PrismicTable(props: PrismicTableProps) {
	const { field, components, fallback = null } = props;

	if (!isFilled.table(field)) {
		return fallback;
	}

	const {
		table: Table,
		thead: Thead,
		tbody: Tbody,
	} = { ...defaultComponents, ...components };

	return (
		<Table table={field}>
			{field.head && (
				<Thead head={field.head}>
					{field.head.rows.map((row) => (
						<TableRow
							key={JSON.stringify(row)}
							row={row}
							components={components}
						/>
					))}
				</Thead>
			)}
			<Tbody body={field.body}>
				{field.body.rows.map((row) => (
					<TableRow
						key={JSON.stringify(row)}
						row={row}
						components={components}
					/>
				))}
			</Tbody>
		</Table>
	);
}

type TableRowProps = {
	row: TableFieldHeadRow | TableFieldBodyRow;
	components?: JSXMapSerializer & TableComponents;
};

function TableRow(props: TableRowProps) {
	const { row, components } = props;

	const { tr: Tr, th: Th, td: Td } = { ...defaultComponents, ...components };

	return (
		<Tr row={row}>
			{row.cells.map((cell) =>
				cell.type === "header" ? (
					<Th key={JSON.stringify(cell)} cell={cell}>
						<PrismicRichText field={cell.content} components={components} />
					</Th>
				) : (
					<Td key={JSON.stringify(cell)} cell={cell}>
						<PrismicRichText field={cell.content} components={components} />
					</Td>
				),
			)}
		</Tr>
	);
}
