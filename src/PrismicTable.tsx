import { ComponentType, FC, ReactNode } from "react";
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
	table?: ComponentType<{ table: TableField<"filled">; children: ReactNode }>;
	thead?: ComponentType<{ head: TableFieldHead; children: ReactNode }>;
	tbody?: ComponentType<{ body: TableFieldBody; children: ReactNode }>;
	tr?: ComponentType<{
		row: TableFieldHeadRow | TableFieldBodyRow;
		children: ReactNode;
	}>;
	th?: ComponentType<{ cell: TableFieldHeaderCell; children: ReactNode }>;
	td?: ComponentType<{ cell: TableFieldDataCell; children: ReactNode }>;
};

const defaultComponents: Required<TableComponents> = {
	table: ({ children }) => <table>{children}</table>,
	thead: ({ children }) => <thead>{children}</thead>,
	tbody: ({ children }) => <tbody>{children}</tbody>,
	tr: ({ children }) => <tr>{children}</tr>,
	th: ({ children }) => <th>{children}</th>,
	td: ({ children }) => <td>{children}</td>,
};

/** Props for `<PrismicTable>`. */
export type PrismicTableProps = {
	/** The Prismic table field to render. */
	field: TableField;

	/**
	 * An object that maps a table block to a React component.
	 *
	 * @example A map serializer.
	 *
	 * ```jsx
	 * {
	 *   table: ({children}) => <table>{children}</table>
	 *   thead: ({children}) => <thead>{children}</thead>
	 * }
	 * ```
	 */
	components?: JSXMapSerializer & TableComponents;

	/**
	 * The value to be rendered when the field is empty. If a fallback is not
	 * given, `null` will be rendered.
	 */
	fallback?: ReactNode;
};

/**
 * Renders content from a Prismic table field as React components.
 *
 * @example
 *
 * ```tsx
 * <PrismicTable field={slice.primary.pricing_table} />;
 * ```
 *
 * @see Learn how to style tables and customize table element components: {@link https://prismic.io/docs/fields/table}
 */
export const PrismicTable: FC<PrismicTableProps> = (props) => {
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
						<TableRow key={row.key} row={row} components={components} />
					))}
				</Thead>
			)}
			<Tbody body={field.body}>
				{field.body.rows.map((row) => (
					<TableRow key={row.key} row={row} components={components} />
				))}
			</Tbody>
		</Table>
	);
};

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
					<Th key={cell.key} cell={cell}>
						<PrismicRichText field={cell.content} components={components} />
					</Th>
				) : (
					<Td key={cell.key} cell={cell}>
						<PrismicRichText field={cell.content} components={components} />
					</Td>
				),
			)}
		</Tr>
	);
}
