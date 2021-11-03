import supertest from 'supertest';
import server from '../../server';
import { factory } from '../../database/factories';
import PostModel from '../../models/posts.model';

const { app } = server;

const api = supertest(app);

const posts = factory('posts').build(100);

describe('posts api tests', () => {
	beforeEach(async () => {
		await PostModel.deleteAll();
		await PostModel.insertMany(posts);
	});

	it('should save a post and consult 101 records', async (done) => {

		await api.post('/api/posts/store').send({
			title: 'test',
			description: 'test',
			email: 'test@test.com',
		});

		const response = await api.post('/api/index/query').send({
			query: '{ posts(limit: 1000, skip: 0, date: "2025-11-03T23:16:27.546Z" ) { _id } }',
		});

		expect(response.body.posts).toHaveLength(posts.length + 1);
		done();
	});

	it('should save a post and return it in the response', async (done) => {

		const res = await api.post('/api/posts/store').send({
			title: 'test',
			description: 'test',
			email: 'test@test.com',
		});

		expect(res.body.title).toBe('test');
		done();
	});

	it('I should like the post', async (done) => {

		const res = await api.post('/api/posts/store').send({
			title: 'test like',
			description: 'test like',
			email: 'testlike@testlike.com',
		});

		await api.post('/api/posts/toogleLike').send({
			id: res.body._id,
			user: res.body.email,
			type: 'like',
		});

		const res2 = await api.post('/api/index/query').send({
			query: `{ post(id: "${res.body._id}" ) { _id, likes } }`,
		});

		expect(res2.body.post.likes.length).toBe(res.body.likes.length + 1);
		done();
	});

	it('I should dislike the post', async (done) => {

		const res = await api.post('/api/posts/store').send({
			title: 'test dislike',
			description: 'test dislike',
			email: 'testlike@testlike.com',
		});

		await api.post('/api/posts/toogleLike').send({
			id: res.body._id,
			user: res.body.email,
			type: 'dislike',
		});

		const res2 = await api.post('/api/index/query').send({
			query: `{ post(id: "${res.body._id}" ) { _id, dislikes } }`,
		});

		expect(res2.body.post.dislikes.length).toBe(res.body.dislikes.length + 1);
		done();
	});
});
