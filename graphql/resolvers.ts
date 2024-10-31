import prisma from '@/prisma/prisma.client';
import { Role } from '@prisma/client';
import {
  AddTransaction,
  AddUser,
  EditUser,
  GraphQLContext,
} from '@/interfaces/graphql';

function requireAdminRole(context: GraphQLContext) {
  if (context.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }
}

export const resolvers = {
  Query: {
    user: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
      requireAdminRole(context);

      return await prisma.user.findUnique({ where: { id } });
    },
    users: async (_: any, __: any, context: GraphQLContext) => {
      requireAdminRole(context);

      return await prisma.user.findMany();
    },
    transactions: async (_: any, __: any, context: GraphQLContext) => {
      return await prisma.transaction.findMany({ include: { user: true } });
    },
  },
  Mutation: {
    addUser: async (
      _: any,
      { name, email, phone, role }: AddUser,
      context: GraphQLContext
    ) => {
      try {
        requireAdminRole(context);

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
    editUser: async (
      _: any,
      { id, name, role }: EditUser,
      context: GraphQLContext
    ) => {
      try {
        requireAdminRole(context);

        return await prisma.user.update({
          where: { id },
          data: { name, role },
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
