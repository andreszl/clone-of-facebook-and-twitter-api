/* eslint-disable no-unused-vars */
import * as interfaces from '../../interfaces';

export default {
	_id: (post: interfaces.posts.IPostSchema): string => post._id,
	title: (post: interfaces.posts.IPostSchema): String => post.title,
	email: (post: interfaces.posts.IPostSchema): String => post.email,
	likes: (post: interfaces.posts.IPostSchema): string[] => post.likes,
	dislikes: (post: interfaces.posts.IPostSchema): string[] => post.dislikes,
	comments: (post: interfaces.posts.IPostSchema): number => post?.comments || 0,
	description: (post: interfaces.posts.IPostSchema): string => post.description,
	timestamp: (post: interfaces.posts.IPostSchema): object => post.timestamp,
};
