import { isFilled, mapSliceZone } from "@prismicio/client";
import { SliceComponentProps, SliceZone } from "@prismicio/react";
import assert from "assert";

import { createClient } from "@/prismicio";

export default async function Page() {
	const client = await createClient();
	const { data: tests } = await client.getSingle("page");

	assert(isFilled.sliceZone(tests.filled));
	assert(!isFilled.sliceZone(tests.empty));

	const graphQLURL = new URL("/graphql", client.documentAPIEndpoint);
	graphQLURL.searchParams.set("query", graphQLQuery);
	const graphQLRes = await client.graphQLFetch(graphQLURL.toString());
	const graphQL = await graphQLRes.json();

	const mapped = await mapSliceZone(tests.filled, {
		text: () => ({ foo: "bar" }),
		image: () => ({ bar: "baz" }),
	});

	return (
		<>
			<div data-testid="filled">
				<SliceZone slices={tests.filled} components={components} />
			</div>

			<div data-testid="empty">
				<SliceZone slices={tests.empty} components={components} />
			</div>

			<div data-testid="todo">
				<SliceZone
					slices={tests.filled}
					components={{ text: components.text }}
				/>
			</div>

			<div data-testid="graphql">
				<SliceZone
					slices={graphQL.data.allPages.edges[0].node.filled}
					components={components}
				/>
			</div>

			<div data-testid="mapped">
				<SliceZone slices={mapped} components={components} />
			</div>
		</>
	);
}

const components = {
	text: (props: SliceComponentProps) => (
		<div data-testid="text">{JSON.stringify(props)}</div>
	),
	image: (props: SliceComponentProps) => (
		<div data-testid="image">{JSON.stringify(props)}</div>
	),
};

const graphQLQuery = /* GraphQL */ `
	query Foo {
		allPages {
			edges {
				node {
					filled {
						...Slices
					}
				}
			}
		}
	}

	fragment Slices on PageFilled {
		... on PageFilledText {
			type
			variation {
				... on PageFilledTextDefault {
					primary {
						content
					}
				}
			}
		}
		... on PageFilledImage {
			type
			variation {
				... on PageFilledImageDefault {
					primary {
						content
					}
				}
			}
		}
	}
`;
