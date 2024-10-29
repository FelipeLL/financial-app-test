import { gql } from '@apollo/client';

export const ADD_TRANSACTION = gql`
  mutation AddTransaction(
    $amount: Float!
    $details: String!
    $date: String!
    $type: TransactionType!
    $userId: ID!
  ) {
    addTransaction(
      amount: $amount
      details: $details
      date: $date
      type: $type
      userId: $userId
    ) {
      amount
      date
      details
      type
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($id: ID!, $name: String!, $role: Role!) {
    editUser(id: $id, name: $name, role: $role) {
      id
      name
      role
    }
  }
`;
