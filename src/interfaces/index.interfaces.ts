import { ObjectId } from 'mongodb'; // eslint-disable-line no-unused-vars

export namespace index {
	export interface IIndexParams {
		query?: string
	}

	export const schema: IIndexParams = {
		query: '',
	};
}
