/* eslint-disable no-unused-vars */
import * as interfaces from '../../interfaces';

export default {
	_id: (post: interfaces.posts.IPost): string => post._id,
	title: (post: interfaces.posts.IPost): String => post.title,
	email: (post: interfaces.posts.IPost): String => post.email,
	likes: (post: interfaces.posts.IPost): string[] => post.likes,
	dislikes: (post: interfaces.posts.IPost): string[] => post.dislikes,
	comments: (post: interfaces.posts.IPost): number => post?.comments || 0,
	description: (post: interfaces.posts.IPost): string => post.description,
	timestamp: (post: interfaces.posts.IPost): object => post.timestamp,
};
