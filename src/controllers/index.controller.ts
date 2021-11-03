import { Request, Response } from 'express'; // eslint-disable-line no-unused-vars
import { graphql } from 'graphql';
import { modules } from '../graphql/modules';

class IndexController {

	public async query(req: Request, res: Response) {
		try {
			const { schema, context } = modules;
			const { query } = req.body;
			const { data } = await graphql(schema, `${query}`, context);
			res.status(200).json(data);
		} catch (err) {
			console.log(err);
			res.json(err);
		}
	}

	public async test(_req: Request, res: Response) {
		try {
			res.status(200).json({ });
		} catch (err) {
			console.log(err);
			res.json(err);
		}
	}

}

export default IndexController;
