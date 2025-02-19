import { ReactNode } from "react";
import { isFilled, TableField } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText } from "./PrismicRichText.js";

type TableFieldHead = NonNullable<TableField<"filled">["head"]>;
type TableFieldBody = TableField<"filled">["body"];
type TableFieldRow =
	| TableFieldHead["rows"][number]
	| TableFieldBody["rows"][number];
type TableFieldCell = TableFieldRow["cells"][number];
type TableFieldHeaderCell = Extract<TableFieldCell, { type: "header" }>;
type TableFieldDataCell = Extract<TableFieldCell, { type: "data" }>;

type TableComponents = {
	table?: (props: {
		table: TableField<"filled">;
		children: ReactNode;
	}) => ReactNode;
	thead?: (props: { head: TableFieldHead; children: ReactNode }) => ReactNode;
	tbody?: (props: { body: TableFieldBody; children: ReactNode }) => ReactNode;
	tr?: (props: { row: TableFieldRow; children: ReactNode }) => ReactNode;
	th?: (props: {
		cell: TableFieldHeaderCell;
		children: ReactNode;
	}) => ReactNode;
	td?: (props: { cell: TableFieldDataCell; children: ReactNode }) => ReactNode;
};

const defaultTableComponents: Required<TableComponents> = {
	table: ({ children }) => <table>{children}</table>,
	thead: ({ children }) => <thead>{children}</thead>,
	tbody: ({ children }) => <tbody>{children}</tbody>,
	tr: ({ children }) => <tr>{children}</tr>,
	th: ({ children }) => <th>{children}</th>,
	td: ({ children }) => <td>{children}</td>,
};

export type PrismicTableProps = {
	field: TableField;
	components?: JSXMapSerializer;
	tableComponents?: TableComponents;
	fallback?: ReactNode;
};

export function PrismicTable(props: PrismicTableProps) {
	const { field, components, tableComponents, fallback = null } = props;

	if (!isFilled.table(field)) {
		return fallback ?? null;
	}

	const {
		table: Table,
		thead: Thead,
		tbody: Tbody,
	} = { ...defaultTableComponents, ...tableComponents };

	return (
		<Table table={field}>
			{field.head && (
				<Thead head={field.head}>
					{field.head.rows.map((row) => (
						<TableRow
							key={JSON.stringify(row)}
							row={row}
							components={components}
							tableComponents={tableComponents}
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
						tableComponents={tableComponents}
					/>
				))}
			</Tbody>
		</Table>
	);
}

type TableRowProps = {
	row: TableFieldRow;
	components?: JSXMapSerializer;
	tableComponents?: TableComponents;
};

function TableRow(props: TableRowProps) {
	const { row, components, tableComponents } = props;

	const {
		tr: Tr,
		th: Th,
		td: Td,
	} = { ...defaultTableComponents, ...tableComponents };

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
