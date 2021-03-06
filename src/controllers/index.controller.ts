import { Request, Response } from 'express'; // eslint-disable-line no-unused-vars
import { graphql } from 'graphql';
import { modules } from '../graphql/modules';
import * as interfaces from '../interfaces';// eslint-disable-line no-unused-vars

import * as utils from '../utils/functions.util';

class IndexController {

	public async query(req: Request<{}, {}, { query?: string }>, res: Response) {
		try {

			utils.validPropeties<interfaces.index.IIndexParams>(req.body, interfaces.index.schema);

			const { schema, context } = modules;
			const { query } = req.body;
			const { data } = await graphql(schema, `${query}`, context);
			res.status(200).json(data);
		} catch (err) {
			res.status(400).json(err);
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
