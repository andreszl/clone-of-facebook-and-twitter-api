import { GraphQLScalarType, Kind } from 'graphql';
import PostModel from '../../models/posts.model';
import Post from './post.schema';
import PostsFactory from '../../database/factories/posts.factory';

export default {
	Query: {
		/**
		 * get posts
		 * @param {string} limit
		 * @param {string} skip
		 * @param {string} date
		 */
		posts: (_, { limit = 10, skip = 1, date = String(new Date()) }) => {
			return PostModel.get(limit, skip, new Date(date));
		},
		post: (_, { id } : { id: string }) => {
			return PostModel.find(id);
		},
		create: (_, { length } : { length: number }) => {
			return new PostsFactory().create(length);
		},
	},
	Post,
	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date',
		serialize(value) {
			return new Date(value);
		},
		parseValue(value) {
			return value.getTime();
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return new Date(ast.value);
			}
			return null;
		},
	}),
};
