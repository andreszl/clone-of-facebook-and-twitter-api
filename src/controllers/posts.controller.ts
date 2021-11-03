/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import _ from 'lodash';
import { FindAndModifyWriteOpResultObject, ObjectId } from 'mongodb';
import request from 'request';
import PostModel from '../models/posts.model';
import * as interfaces from '../interfaces';

export default class {
	public async store(
		req: Request<{}, {}, interfaces.posts.Icreate>,
		res: Response,
	) {
		try {
			const result = await PostModel.store({
				_id: new ObjectId(),
				...req.body,
				likes: [],
				dislikes: [],
				timestamp: {
					created_at: new Date(),
					updated_at: new Date(),
				},
			});
			res.status(200).json(result.ops[0]);
		} catch (err) {
			res.json(err);
		}
	}

	public async addComment(
		req: Request<{}, {}, { postId: string }>,
		res: Response,
	) {
		try {
			const result = await PostModel.addComment(req.body.postId);
			res.status(200).json(result.value || {});
		} catch (err) {
			res.json(err);
		}
	}

	public async toogleLike(
		req: Request<{}, {}, { id: string, user: string, type: 'like'|'dislike' }>,
		res: Response,
	) {
		try {
			const post = await PostModel.find(req.body.id);

			const like = post?.likes.find((l) => l === req.body.user);
			const dislike = post?.dislikes.find((l) => l === req.body.user);

			let result: FindAndModifyWriteOpResultObject<interfaces.posts.IPost>|undefined;

			if (post) {
				if (like && req.body.type === 'like') {
					result = await PostModel.removeLike(req.body.id, req.body.user);
				} else if (req.body.type === 'like') {
					result = await PostModel.addLike(req.body.id, req.body.user);
				}

				if (dislike && req.body.type === 'dislike') {
					result = await PostModel.removeDislike(req.body.id, req.body.user);
				} else if (req.body.type === 'dislike') {
					result = await PostModel.addDislike(req.body.id, req.body.user);
				}
			}

			res.status(200).json(result?.value || {});
		} catch (err) {
			res.json(err);
		}
	}
}
