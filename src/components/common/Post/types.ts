export interface IPostProps {
	id: string,
	title: string,
	createdAt: string,
	imageUrl: string,
	author: Record<string, string>,
	viewsCount: number,
	tags: string[],
	children?: React.ReactNode,
	isFullPost?: boolean,
	isLoading?: boolean,
	isEditable?: boolean
}