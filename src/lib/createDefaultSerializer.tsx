import * as React from "react";
import { LinkResolverFunction, RichTextNodeType } from "@prismicio/client";
import { RichTextMapSerializerFunction } from "@prismicio/richtext";

import {
	JSXFunctionSerializer,
	JSXMapSerializer,
	JSXMapSerializerWithShorthands,
} from "../types";
import { PrismicLink, LinkProps } from "../react-server/PrismicLink";

export const RichTextReversedNodeType = {
	[RichTextNodeType.listItem]: "listItem",
	[RichTextNodeType.oListItem]: "oListItem",
	[RichTextNodeType.list]: "list",
	[RichTextNodeType.oList]: "oList",
} as const;

const getExtraPropsForBlock = (
	block: Parameters<RichTextMapSerializerFunction<JSX.Element>>[0],
	serializer?: JSXMapSerializerWithShorthands | JSXFunctionSerializer,
): { className?: string } => {
	if (!serializer) {
		return {};
	}

	const definition =
		typeof serializer === "object"
			? serializer[
					(block.type in RichTextReversedNodeType
						? RichTextReversedNodeType[
								block.type as keyof typeof RichTextReversedNodeType
						  ]
						: block.type) as keyof typeof serializer
			  ]
			: serializer(
					block.type,
					block.node,
					block.text,
					block.children,
					block.key,
			  );

	if (definition && "className" in definition) {
		return {
			className: definition.className,
		};
	}

	return {};
};

type CreateDefaultSerializerArgs<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TLinkResolverFunction extends LinkResolverFunction<any> = LinkResolverFunction,
> = {
	providedSerializer?: JSXMapSerializerWithShorthands | JSXFunctionSerializer;
	linkResolver: TLinkResolverFunction | undefined;
	internalLinkComponent?: React.ComponentType<LinkProps>;
	externalLinkComponent?: React.ComponentType<LinkProps>;
};

export const createDefaultSerializer = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TLinkResolverFunction extends LinkResolverFunction<any>,
>(
	args: CreateDefaultSerializerArgs<TLinkResolverFunction>,
): JSXMapSerializer => {
	return {
		heading1: (block) => (
			<h1
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</h1>
		),
		heading2: (block) => (
			<h2
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</h2>
		),
		heading3: (block) => (
			<h3
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</h3>
		),
		heading4: (block) => (
			<h4
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</h4>
		),
		heading5: (block) => (
			<h5
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</h5>
		),
		heading6: (block) => (
			<h6
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</h6>
		),
		paragraph: (block) => (
			<p
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</p>
		),
		preformatted: (block) => (
			<pre
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.node.text}
			</pre>
		),
		strong: (block) => (
			<strong
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</strong>
		),
		em: (block) => (
			<em
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</em>
		),
		listItem: (block) => (
			<li
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</li>
		),
		oListItem: (block) => (
			<li
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</li>
		),
		list: (block) => (
			<ul
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</ul>
		),
		oList: (block) => (
			<ol
				key={block.key}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</ol>
		),
		image: (block) => {
			const img = (
				<img
					src={block.node.url}
					alt={block.node.alt ?? undefined}
					data-copyright={
						block.node.copyright ? block.node.copyright : undefined
					}
					{...getExtraPropsForBlock(block, args.providedSerializer)}
				/>
			);

			return (
				<p key={block.key} className="block-img">
					{block.node.linkTo ? (
						<PrismicLink
							linkResolver={args.linkResolver}
							internalComponent={args.internalLinkComponent}
							externalComponent={args.externalLinkComponent}
							field={block.node.linkTo}
						>
							{img}
						</PrismicLink>
					) : (
						img
					)}
				</p>
			);
		},
		embed: (block) => (
			<div
				key={block.key}
				data-oembed={block.node.oembed.embed_url}
				data-oembed-type={block.node.oembed.type}
				data-oembed-provider={block.node.oembed.provider_name}
				dangerouslySetInnerHTML={{ __html: block.node.oembed.html ?? "" }}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			/>
		),
		hyperlink: (block) => (
			<PrismicLink
				key={block.key}
				field={block.node.data}
				linkResolver={args.linkResolver}
				internalComponent={args.internalLinkComponent}
				externalComponent={args.externalLinkComponent}
				{...getExtraPropsForBlock(block, args.providedSerializer)}
			>
				{block.children}
			</PrismicLink>
		),
		label: (block) => {
			const { className, ...extraProps } = getExtraPropsForBlock(
				block,
				args.providedSerializer,
			);

			return (
				<span
					key={block.key}
					className={
						className
							? `${block.node.data.label} ${className}`
							: block.node.data.label
					}
					{...extraProps}
				>
					{block.children}
				</span>
			);
		},
		span: (block) => {
			const result: React.ReactNode[] = [];

			let i = 0;
			for (const line of block.text.split("\n")) {
				if (i > 0) {
					result.push(<br key={`${i}__break`} />);
				}

				result.push(<React.Fragment key={`${i}__line`}>{line}</React.Fragment>);

				i++;
			}

			return <React.Fragment key={block.key}>{result}</React.Fragment>;
		},
	};
};
