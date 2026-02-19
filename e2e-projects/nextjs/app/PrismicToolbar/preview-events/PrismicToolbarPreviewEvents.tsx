"use client";

import { type ReactNode, useState } from "react";
import { PrismicToolbar } from "@prismicio/react";

export function PrismicToolbarPreviewEvents(props: {
	repositoryName: string;
}): ReactNode {
	const [updateCount, setUpdateCount] = useState(0);
	const [endCount, setEndCount] = useState(0);
	const [updateRef, setUpdateRef] = useState<string>("");

	return (
		<>
			<PrismicToolbar
				repositoryName={props.repositoryName}
				onPreviewUpdate={(event) => {
					setUpdateCount((c) => c + 1);
					setUpdateRef(event.detail.ref);
				}}
				onPreviewEnd={() => setEndCount((c) => c + 1)}
			/>
			<span data-testid="update-count">{updateCount}</span>
			<span data-testid="end-count">{endCount}</span>
			<span data-testid="update-ref">{updateRef}</span>
		</>
	);
}
