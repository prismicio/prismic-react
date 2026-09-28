"use client"

import { type ReactNode, useId, useLayoutEffect, useRef, useSyncExternalStore } from "react"

type SliceBoundaryProps = {
	children: ReactNode
	sliceId: string
}

export function SliceBoundary(props: SliceBoundaryProps): ReactNode {
	const { children, sliceId } = props

	return (
		<>
			<CommentMarker value={`prismic-slice-start:${sliceId}`} />
			{children}
			<CommentMarker value={`prismic-slice-end:${sliceId}`} />
		</>
	)
}

type CommentMarkerProps = {
	value: string
}

function CommentMarker(props: CommentMarkerProps) {
	const { value } = props
	const id = useId()
	const isClient = useIsClient()
	const anchorRef = useRef<Text>(null)
	const anchorValue = `__prismic_react_internal_comment_anchor_${id}__`

	useLayoutEffect(() => {
		let anchor = anchorRef.current

		if (!anchor?.isConnected) {
			anchor = findTextNode(anchorValue)
			if (!anchor) return
			anchorRef.current = anchor
		}

		// React restores the text when a hidden Suspense or Activity subtree is shown again.
		if (anchor.data !== "") anchor.data = ""

		const comment = document.createComment(value)
		anchor.after(comment)

		return () => comment.remove()
	})

	return isClient ? anchorValue : null
}

function useIsClient() {
	return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
}

function subscribe() {
	return () => {}
}

function getClientSnapshot() {
	return true
}

function getServerSnapshot() {
	return false
}

function findTextNode(value: string) {
	const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)

	while (walker.nextNode()) {
		const node = walker.currentNode
		if (node instanceof Text && node.data === value) return node
	}

	return null
}
