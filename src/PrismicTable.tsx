import { JSX, ReactNode } from "react";
import { isFilled, RichTextField, TableField } from "@prismicio/client";
import { RichTextMapSerializer } from "@prismicio/client/richtext";
import { PrismicRichText } from "./PrismicRichText.js";

type TableSerializerFunction = (args: {
	children: ReactNode;
	key?: string;
}) => JSX.Element;
type CellContentFunction = (args: {
	children: RichTextField | null;
}) => JSX.Element;

const tableSerializerOptions = [
	"table",
	"head",
	"body",
	"row",
	"header",
	"data",
	"cellContent",
] as const;

type TableMapSerializerKey = (typeof tableSerializerOptions)[number];

type TableMapSerializerFilled = {
	[K in Exclude<TableMapSerializerKey, "cellContent">]: TableSerializerFunction;
} & {
	cellContent: CellContentFunction;
};

type TableMapSerializer = Partial<TableMapSerializerFilled> &
	RichTextMapSerializer<ReactNode>;

const createDefaultTableSerializer = (
	components?: TableMapSerializer,
): TableMapSerializerFilled => {
	// filter out table serializer options to get just the table cell (rich text) components
	const tableCellComponents = components
		? Object.fromEntries(
				Object.entries(components).filter(([key]) => {
					return !tableSerializerOptions.includes(key as TableMapSerializerKey);
				}),
			)
		: {};

	// filter out the table cell (rich text) options to get just the table options
	const tableComponents = components
		? Object.fromEntries(
				Object.entries(components).filter(([key]) => {
					return tableSerializerOptions.includes(key as TableMapSerializerKey);
				}),
			)
		: null;

	return {
		table: ({ children }) => <table>{children}</table>,
		head: ({ children }) => <thead>{children}</thead>,
		body: ({ children }) => <tbody>{children}</tbody>,
		row: ({ children, key }) => <tr key={key}>{children}</tr>,
		header: ({ children, key }) => <th key={key}>{children}</th>,
		data: ({ children, key }) => <td key={key}>{children}</td>,
		cellContent: ({ children }) => (
			<PrismicRichText field={children} components={tableCellComponents} />
		),
		...tableComponents,
	};
};

export type PrismicTableProps = {
	field: TableField;
	components?: TableMapSerializer;
	fallback?: JSX.Element;
};

export function PrismicTable({
	field,
	components,
	fallback,
}: PrismicTableProps) {
	const serializer = createDefaultTableSerializer(components);

	if (isFilled.table(field)) {
		return serializer.table({
			children: (
				<>
					<TableHead field={field} serializer={serializer} />
					<TableBody field={field} serializer={serializer} />
				</>
			),
		});
	} else {
		return fallback ?? null;
	}
}

type TableHeadProps = {
	field: TableField;
	serializer: TableMapSerializerFilled;
};

function TableHead({ field, serializer }: TableHeadProps) {
	return field && field.head
		? serializer.head({
				children: <TableRows rows={field?.head.rows} serializer={serializer} />,
			})
		: null;
}

type TableBodyProps = {
	field: TableField;
	serializer: TableMapSerializerFilled;
};

function TableBody({ field, serializer }: TableBodyProps) {
	return field && field.body
		? serializer.body({
				children: <TableRows rows={field?.body.rows} serializer={serializer} />,
			})
		: null;
}

type TableRows = TableField<"filled">["body"]["rows"];

type TableRowsProps = {
	rows: TableRows;
	serializer: TableMapSerializerFilled;
};

function TableRows({ rows, serializer }: TableRowsProps) {
	return rows.map((row) => {
		return serializer.row({
			children: <TableCells cells={row.cells} serializer={serializer} />,
			key: crypto.randomUUID(),
		});
	});
}

type TableCellsProps = {
	cells: TableRows[0]["cells"];
	serializer: TableMapSerializerFilled;
};

function TableCells({ cells, serializer }: TableCellsProps) {
	return cells.map((cell) => {
		return serializer[cell.type]({
			children: serializer.cellContent({ children: cell.content }),
			key: crypto.randomUUID(),
		});
	});
}
