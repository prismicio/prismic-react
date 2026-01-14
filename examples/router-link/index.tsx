import type * as prismic from "@prismicio/client";
import { PrismicLink, type LinkProps } from "@prismicio/react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

// This is an example Link field value. It contains a URL internal to the app.
const field: prismic.LinkField = {
	link_type: "Web",
	url: "/internal-url",
};

// This React component acts as a "shim" to convert the `href` prop provided by
// `<PrismicLink>` to the `to` prop required by react-router-dom's `<Link>`.
const LinkShim = ({ href, ...props }: LinkProps): ReactNode => {
	return <Link to={href} {...props} />;
};

// We render the Link field using `<PrismicLink>`. Since the field contains an
// internal URL, react-router-dom's `<Link>` component will render.
export const App = (): ReactNode => {
	return (
		<main>
			<PrismicLink field={field} internalComponent={LinkShim} />
		</main>
	);
};
