import PostsFactory from './posts.factory';

function factory(model: 'posts') {

	switch (model) {
		case 'posts':
			return new PostsFactory();

		default:
			return new PostsFactory();
	}
}

const Post = PostsFactory;

export {
	factory,
	Post,
};
