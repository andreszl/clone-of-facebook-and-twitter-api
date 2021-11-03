import { ObjectId } from 'mongodb';
import faker from 'faker';
import _ from 'lodash';
import * as interfaces from '../../interfaces/posts.interfaces'; // eslint-disable-line no-unused-vars
import PostModel from '../../models/posts.model';

class PostsFactory {

	private static instance: PostsFactory;
	private _id: ObjectId;
	private title: string;
	private description: string;
	private email: string;
	private likes: string[];
	private dislikes: string[];
	private timestamp_created_at: Date;
	private timestamp_updated_at: Date;
	private post: interfaces.posts.IPost|interfaces.posts.ISubscribe;

	/**
	 * Getter _id
	 * @return {ObjectId}
	 */
	public get $_id(): ObjectId {
		return this._id;
	}

	/**
	 * Getter $title
	 * @return {string}
	 */
	public get $title(): string {
		return this.title;
	}

	/**
	 * Getter $description
	 * @return {string}
	 */
	public get $description(): string {
		return this.description;
	}

	/**
	 * Getter $email
	 * @return {string}
	 */
	public get $email(): string {
		return this.email;
	}

	/**
	 * Getter $likes
	 * @return {string[]}
	 */
	public get $likes(): string[] {
		return this.likes;
	}

	/**
	 * Getter $dislikes
	 * @return {string[]}
	 */
	public get $dislikes(): string[] {
		return this.dislikes;
	}

	/**
	 * Getter $timestamp_created_at
	 * @return {Date}
	 */
	public get $timestamp_created_at(): Date {
		return this.timestamp_created_at;
	}

	/**
	 * Getter $timestamp_updated_at
	 * @return {Date}
	 */
	public get $timestamp_updated_at(): Date {
		return this.timestamp_updated_at;
	}

	/**
	 * Getter $post
	 * @return {interfaces.posts.IPost|interfaces.posts.ISubscribe}
	 */
	public get $post(): interfaces.posts.IPost|interfaces.posts.ISubscribe {
		return {
			_id: this.$_id,
			title: this.$title,
			description: this.$description,
			email: this.$email,
			likes: this.$likes,
			dislikes: this.$dislikes,
			timestamp: {
				created_at: this.$timestamp_created_at,
				updated_at: this.$timestamp_updated_at,
			},
		};
	}

	/**
	 * Setter _id
	 * @param {ObjectId} value
	 */
	public set $_id(value: ObjectId) {
		this._id = value;
	}

	/**
	 * Setter $title
	 * @param {string} value
	 */
	public set $title(value: string) {
		this.title = value;
	}

	/**
	 * Setter $description
	 * @param {string} value
	 */
	public set $description(value: string) {
		this.description = value;
	}

	/**
	 * Setter $email
	 * @param {string} value
	 */
	public set $email(value: string) {
		this.email = value;
	}

	/**
	 * Setter $likes
	 * @param {string[]} value
	 */
	public set $likes(value: string[]) {
		this.likes = value;
	}

	/**
	 * Setter $dislikes
	 * @param {string[]} value
	 */
	public set $dislikes(value: string[]) {
		this.dislikes = value;
	}

	/**
	 * Setter $timestamp_created_at
	 * @param {Date} value
	 */
	public set $timestamp_created_at(value: Date) {
		this.timestamp_created_at = value;
	}

	/**
	 * Setter $timestamp_updated_at
	 * @param {Date} value
	 */
	public set $timestamp_updated_at(value: Date) {
		this.timestamp_updated_at = value;
	}

	/**
	 * Setter $post
	 * @param {interfaces.posts.IPost|interfaces.posts.ISubscribe} value
	 */
	public set $post(post: interfaces.posts.IPost|interfaces.posts.ISubscribe) {
		this._id = post._id || this._id;
		this.title = post.title || this.title;
		this.description = post.description || this.description;
		this.email = post.email || this.email;
		this.likes = post.likes || this.likes;
		this.dislikes = post.dislikes || this.dislikes;
		this.timestamp_created_at = _.get(post.timestamp, 'created_at') || this.timestamp_created_at;
		this.timestamp_updated_at = _.get(post.timestamp, 'updated_at') || this.timestamp_updated_at;
		this.post = this.$post || this.post;
	}

	constructor(post: interfaces.posts.ISubscribe = {}) {
		this._id = post._id || new ObjectId();
		this.title = post.title || '';
		this.description = post.description || '';
		this.email = post.email || '';
		this.likes = post.likes || [];
		this.dislikes = post.dislikes || [];
		this.timestamp_created_at = _.get(post.timestamp, 'created_at') || new Date();
		this.timestamp_updated_at = _.get(post.timestamp, 'updated_at') || new Date();
		this.post = this.$post;
	}

	public static getInstance(): PostsFactory {
		if (!PostsFactory.instance) {
			PostsFactory.instance = new PostsFactory();
		}

		return PostsFactory.instance;
	}

	private builder(
		subscribeProperties: interfaces.posts.ISubscribe = {},
	): interfaces.posts.IPost {

		const created_at = faker.date.past(_.random(0, 10), new Date());

		return {
			_id: subscribeProperties._id || new ObjectId(),
			title: subscribeProperties.title || `${faker.lorem.words(_.sample([1, 2, 3, 4]))}`,
			description: subscribeProperties.description || faker.lorem.text(),
			email: subscribeProperties.email || faker.internet.email(),
			likes: subscribeProperties.likes || Array.from({
				length: faker.random.number(500),
			}, () => faker.internet.email()),
			dislikes: subscribeProperties.dislikes || Array.from({
				length: faker.random.number(500),
			}, () => faker.internet.email()),
			timestamp: subscribeProperties.timestamp || {
				created_at: _.get(subscribeProperties.timestamp, 'created_at') || created_at,
				updated_at: _.get(subscribeProperties.timestamp, 'updated_at') || faker.date.between(created_at, new Date()),
			},
		};
	}

	public build(length: number = 1, subscribeProperties: interfaces.posts.ISubscribe = {}) {

		const posts: interfaces.posts.IPost[] = [];
		for (let count = 1; count <= length; count += 1) {
			posts.push(this.builder(subscribeProperties));
		}

		return posts;
	}

	public create(length: number = 1, subscribeProperties: interfaces.posts.ISubscribe = {}) {
		try {
			const posts: interfaces.posts.IPost[] = [];

			for (let count = 1; count <= length; count += 1) {
				posts.push(this.builder(subscribeProperties));
			}

			if (process.env.NODE_ENV !== 'test') {
				PostModel.insertMany(posts);
			}

			return posts;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	public save() {
		try {
			if (process.env.NODE_ENV !== 'test') {
				PostModel.store(this.$post as interfaces.posts.IPost);
			}

			return this.$post;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
}

export default PostsFactory;
