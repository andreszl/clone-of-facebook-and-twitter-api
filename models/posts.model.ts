import { ObjectId } from 'mongodb'; // eslint-disable-line no-unused-vars
import db from '../database/db.conn';
import * as interfaces from '../interfaces'; // eslint-disable-line no-unused-vars

class PostModel {

	public static async get(limit: number, skip: number, date: Date) {
		return (await db).collection<interfaces.posts.IPost>('posts')
			.find({
				$or: [{ 'timestamp.created_at': { $lte: date } }],
			}).limit(limit)
			.skip(skip)
			.sort({ 'timestamp.created_at': -1 })
			.toArray();
	}

	public static async find(id: string) {
		return (await db).collection<interfaces.posts.IPost>('posts')
			.findOne({ _id: new ObjectId(id) });
	}

	public static async insertMany(posts: interfaces.posts.IPost[]) {
		return (await db).collection<interfaces.posts.IPost>('posts').insertMany(posts);
	}

	public static async store(post: interfaces.posts.IPost) {
		return (await db).collection<interfaces.posts.IPost>('posts').insertOne(post);
	}

	public static async addLike(id: string, user: string) {
		return (await db).collection<interfaces.posts.IPost>('posts').findOneAndUpdate(
			{
				_id: new ObjectId(id),
			},
			{
				$push: { likes: user },
				$pull: { dislikes: user },
			},
			{ returnOriginal: false },
		);
	}

	public static async removeLike(id: string, user: string) {
		return (await db).collection<interfaces.posts.IPost>('posts').findOneAndUpdate(
			{
				_id: new ObjectId(id),
			},
			{
				$pull: { likes: user },
			},
			{ returnOriginal: false },
		);
	}

	public static async addDislike(id: string, user: string) {
		return (await db).collection<interfaces.posts.IPost>('posts').findOneAndUpdate(
			{
				_id: new ObjectId(id),
			},
			{
				$push: { dislikes: user },
				$pull: { likes: user },
			},
			{ returnOriginal: false },
		);
	}

	public static async removeDislike(id: string, user: string) {
		return (await db).collection<interfaces.posts.IPost>('posts').findOneAndUpdate(
			{
				_id: new ObjectId(id),
			},
			{
				$pull: { dislikes: user },
			},
			{ returnOriginal: false },
		);
	}

	public static async addComment(postId: string) {
		return (await db).collection<interfaces.posts.IPost>('posts').findOneAndUpdate(
			{
				_id: new ObjectId(postId),
			},
			{ $inc: { comments: +1 } },
			{ returnOriginal: false },
		);
	}
}

export default PostModel;
