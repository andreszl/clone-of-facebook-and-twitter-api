import { GraphQLModule } from '@graphql-modules/core';
import post from './post';

export const modules = new GraphQLModule({
	imports: [
		post,
	],
});
