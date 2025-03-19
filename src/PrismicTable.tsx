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
 * React component that renders content from a Prismic table field. By default,
 * HTML elements are rendered for each piece of content. A `tbody` block will
 * render a `<tbody>` HTML element, for example.
 *
 * To customize the components that are rendered, provide a map serializer to
 * the `components` prop.
 *
 * @example Rendering a table field using the default HTMl elements.
 *
 * ```jsx
 * <PrismicTable field={document.data.my_table} />;
 * ```
 *
 * @example Rendering a table field using a custom set of React components.
 *
 * ```jsx
 * <PrismicTable
 * 	field={document.data.my_table}
 * 	components={{
 * 		tbody: ({ children }) => (
 * 			<tbody className="my-class">{children}</tbody>
 * 		),
 * 	}}
 * />;
 * ```
 *
 * @param props - Props for the component.
 *
 * @returns The table field's content as React components.
 *
 * @see Learn about table fields {@link https://prismic.io/docs/core-concepts/table}
 */
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
