import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    user(id: ID!): User
    users: [User!]!
    transactions: [Transaction!]!
  }

  type Mutation {
    addUser(name: String!, email: String!, phone: String, role: Role!): User
    editUser(id: ID!, name: String, role: Role!): User
    addTransaction(
      amount: Float!
      details: String!
      date: String!
      type: TransactionType!
      userId: ID!
    ): Transaction
  }

  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    role: Role!
  }

  type Transaction {
    id: ID!
    amount: Float!
    date: String!
    details: String!
    type: TransactionType!
    user: User!
  }

  enum Role {
    USER
    ADMIN
  }

  enum TransactionType {
    INCOME
    EXPENSE
  }
`;
