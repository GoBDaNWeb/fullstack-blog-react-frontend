import React from "react"

export interface ITabPanel {
	children?: React.ReactNode[],
	index: number,
	value: number
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