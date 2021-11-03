import gql from 'graphql-tag';

export default gql`

  scalar Date

  type Post {
    _id: String!
    title: String!
    email: String!
    likes: [String]!
    dislikes: [String]!
		comments: Int
    description: String!
    timestamp: Timestamp!
  }

  type Timestamp {
    created_at: Date
    updated_at: Date
  }

  type Query {
    posts(limit: Int, skip: Int, date: String): [Post]
    post(id: String): Post
    create(length: Int): [Post]
  }
`;
