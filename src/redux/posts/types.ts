export enum PostStatus {
    LOADING = 'loading',
    SUCCESS = 'loaded',
    ERROR = 'error'
}

export type TagsType = {
    items: string[],
    status: PostStatus
}

export type PostItems = {
    _id: string,
    title: string,
    text: string,
    tags: string[],
    viewsCount: number,
    author: Record<string, string>,
    createdAt: string,
    updatedAt: string
}

export interface PostStateItems {
    items: PostItems[],
    status: PostStatus
}

export interface PostState {
    posts: PostStateItems,
    popularPosts: PostStateItems,
    postsByTags: PostStateItems,
    tags: TagsType,
}