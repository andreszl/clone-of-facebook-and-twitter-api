import supertest from 'supertest';
import server from '../../server';

const { app } = server;

const api = supertest(app);

describe('index api tests', () => {
	it('It should wait for a 200 response, of type json and of type empty object', async (done) => {
		await api.get('/api/index/test')
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect({});
		done();
	});

	it('It should wait for a 400 response if it does not send the query parameter', async (done) => {
		const res = await api.post('/api/index/query');
		expect(res.statusCode).toBe(400);
		done();
	});

	it('It should wait for a 200 response if it does send the query parameter', async (done) => {
		const res = await api.post('/api/index/query').send({ query: '' });
		expect(res.statusCode).toBe(200);
		done();
	});

	it('It should wait for a 200 response if the query parameter and any other parameter are sent', async (done) => {
		const res = await api.post('/api/index/query').send({ query: '', test: '' });
		expect(res.statusCode).toBe(200);
		done();
	});

});
