import { ObjectId } from 'mongodb';
import PostFactory from '../../database/factories/posts.factory';
import { factory } from '../../database/factories';
import * as interfaces from '../../interfaces/posts.interfaces'; // eslint-disable-line no-unused-vars

describe('post factory Tests', () => {
	it('should create a post by instance class', async (done) => {

		const post = new PostFactory();
		const _id = new ObjectId(1);

		post.$_id = _id;

		expect(Array.isArray(post.$post)).toBe(false);
		expect(post.$post).toMatchObject({ _id });
		done();
	});

	it('should create and initialize a post using class instance constructor', async (done) => {

		const postRecord = (factory('posts') as PostFactory).build()[0];

		const post = new PostFactory(postRecord);

		expect(Array.isArray(post.$post)).toBe(false);
		expect(post.$post).toMatchObject(postRecord);
		done();
	});

	it('should create and initialize a post using the class instance post setter method', async (done) => {

		const postRecord = (factory('posts') as PostFactory).build()[0];

		const post = new PostFactory();

		post.$post = postRecord;

		expect(Array.isArray(post.$post)).toBe(false);
		expect(post.$post).toMatchObject(postRecord);
		done();
	});

	it('should create and initialize a custom post using the class instance post setter method ', async (done) => {

		const postRecord: interfaces.posts.ISubscribe = {
			_id: new ObjectId(1),
			title: 'Title',
		};

		const post = new PostFactory();

		post.$post = postRecord;

		expect(Array.isArray(post.$post)).toBe(false);
		expect(post.$post).toMatchObject(postRecord);
		done();
	});

	it('should create posts', (done) => {

		const posts = (factory('posts') as PostFactory).build(10);

		expect(Array.isArray(posts)).toBe(true);
		expect(posts).toHaveLength(10);
		done();
	});
});
