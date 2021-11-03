import { ObjectId } from 'mongodb'; // eslint-disable-line no-unused-vars

export namespace posts {
	export interface IPost {
		_id: ObjectId,
		title: string,
		description: string,
		email: string,
		likes: string[],
		dislikes: string[]
		comments?: number,
		timestamp: {
			created_at: Date,
			updated_at: Date,
		},
	}
	export interface IPostSchema {
		_id: string,
		title: string,
		description: string,
		email: string,
		likes: string[],
		dislikes: string[]
		comments?: number,
		timestamp: {
			created_at: Date,
			updated_at: Date,
		},
	}

	export interface Icreate {
		title: string,
		description: string,
		email: string,
	}

	export interface ISubscribe {
		_id?: ObjectId,
		title?: string,
		description?: string,
		email?: string,
		likes?: string[],
		dislikes?: string[]
		timestamp?: {
			created_at: Date,
			updated_at: Date,
		},
		'timestamp.created_at'?: Date,
		'timestamp.updated_at'?: Date,
	}

	export const schema: Icreate = {
		title: '',
		description: '',
		email: '',
	};
}
