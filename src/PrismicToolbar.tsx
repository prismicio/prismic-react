import * as React from "react";

export type PrismicToolbarProps = {
	repositoryName: string;
	type?: "new" | "legacy";
};

export const PrismicToolbar = ({
	repositoryName,
	type = "new",
}: PrismicToolbarProps): JSX.Element => {
	return (
		<script
			src={`https://static.cdn.prismic.io/prismic.js?repositoryName=${repositoryName}${
				type == "new" ? "&type=new" : ""
			}`}
			defer={true}
		/>
	);
};
