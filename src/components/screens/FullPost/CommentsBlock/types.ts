export interface IComment {
	_id: string,
	text: string,
	author: Record<string, string>,
	postId: string,
	updatedAt: string,
	createdAt: string,
}

export interface ICommentsBlockProps {
	comments: IComment[] | [],
	children: React.ReactNode,
	isLoading: boolean
}