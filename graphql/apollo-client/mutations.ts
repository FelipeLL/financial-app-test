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
