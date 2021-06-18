import * as React from "react";
import * as prismic from "@prismicio/client";
import * as prismicT from "@prismicio/types";

import {
	State,
	StateType,
	usePrismicClientStateMachine,
} from "./usePrismicClientStateMachine";
import { usePrismicClient } from "./usePrismicClient";

type UsePrismicDocumentParams = {
	client?: prismic.Client;
} & Partial<prismic.BuildQueryURLArgs>;

export const usePrismicDocumentByUID = <
	TDocument extends prismicT.PrismicDocument,
>(
	documentType: string,
	uid: string,
	{ client: explicitClient, ...params }: UsePrismicDocumentParams = {},
): State<TDocument> => {
	const machine = usePrismicClientStateMachine<TDocument>();
	const client = usePrismicClient(explicitClient);

	React.useEffect(() => {
		if (machine.state.state === StateType.IDLE) {
			machine.actions.declareStarting();

			client
				.getByUID<TDocument>(documentType, uid, params)
				.then((document) => {
					machine.actions.declareSuccess(document);
				})
				.catch((error) => {
					machine.actions.declareFailure(error);
				});
		}
	}, [machine.actions, machine.state.state, client, documentType, uid, params]);

	return machine.state;
};
