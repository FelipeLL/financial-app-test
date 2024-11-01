import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Query {
    users {
      id
      name
      email
      phone
      role
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      role
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query Transactions {
    transactions {
      id
      amount
      date
      details
      type
      user {
        name
      }
    }
  }
`;
