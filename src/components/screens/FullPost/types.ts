export interface IComment {
	_id: string,
	text: string,
	author: Record<string, string>,
	postId: string,
	updatedAt: string,
	createdAt: string,
}


export interface IPostData {
	_id: string,
	title: string,
	text: string,
	tags: string[],
	viewsCount: number,
	author: Record<string, string>,
	imageUrl: string,
	createdAt: string
}
