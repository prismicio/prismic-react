import * as React from "react";
import * as prismicT from "@prismicio/types";
import { PrismicLink, LinkProps } from "@prismicio/react";
import { Link } from "react-router-dom";

// This is an example Link field value. It contains a URL internal to the app.
const field: prismicT.LinkField = {
	link_type: prismicT.LinkType.Web,
	url: "/internal-url",
};

// This React component acts as a "shim" to convert the `href` prop provided by
// `<PrismicLink>` to the `to` prop required by react-router-dom's `<Link>`.
const LinkShim = ({ href, ...props }: LinkProps) => {
	return <Link to={href} {...props} />;
};

// We render the Link field using `<PrismicLink>`. Since the field contains an
// internal URL, react-router-dom's `<Link>` component will render.
export const App = (): JSX.Element => {
	return (
		<main>
			<PrismicLink field={field} internalComponent={LinkShim} />
		</main>
	);
};
