import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'graphql-tag';

import prisma from '@/prisma/prisma.client';
import { AddTransaction, AddUser, EditUser } from '@/interfaces/graphql';

const typeDefs = gql`
  type Query {
    users: [User!]!
    transactions: [Transaction!]!
  }

  type Mutation {
    addUser(name: String!, email: String!, phone: String, role: Role!): User
    editUser(id: ID!, role: Role!): User
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

const users = [{ name: 'Foo Bar', username: 'foobar' }];

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    transactions: async () =>
      await prisma.transaction.findMany({ include: { user: true } }),
  },
  Mutation: {
    addUser: async (_: any, { name, email, phone, role }: AddUser) => {
      try {
        return await prisma.user.create({
          data: {
            name,
            email,
            phone,
            role,
          },
        });
      } catch (error) {
        console.error('[ERROR ADDING USER]: ', error);
        throw new Error('ERROR ADDING USER');
      }
    },
    editUser: async (_: any, { id, role }: EditUser) => {
      try {
        return await prisma.user.update({
          where: { id },
          data: { role },
        });
      } catch (error) {
        console.error('[ERROR EDITING USER]: ', error);
        throw new Error('ERROR EDITING USER');
      }
    },
    addTransaction: async (
      _: any,
      { amount, date, details, type, userId }: AddTransaction
    ) => {
      try {
        return await prisma.transaction.create({
          data: {
            amount,
            date: new Date(date),
            details,
            type,
            userId,
          },
        });
      } catch (error) {
        console.error('[ERROR ADDING TRANSACTION]: ', error);
        throw new Error('ERROR ADDING TRANSACTION');
      }
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);
