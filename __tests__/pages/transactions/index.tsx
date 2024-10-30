import { render, screen } from '@testing-library/react';
import TransactionsPage from '@/pages/transactions';
import { useQuery } from '@apollo/client';
import '@testing-library/jest-dom';
import { formatDate } from '@/lib/format-date';

jest.mock('@apollo/client', () => {
  const actualApolloClient = jest.requireActual('@apollo/client');
  return {
    ...actualApolloClient,
    useQuery: jest.fn(),
  };
});

describe('TransactionsPage', () => {
  it('should render loader when loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null,
    });

    render(<TransactionsPage />);

    const loader = document.querySelector('.animate-spin');
    expect(loader).toBeInTheDocument();
  });

  it('should display error message when there is an error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: { message: 'Something went wrong' },
      data: null,
    });

    render(<TransactionsPage />);

    expect(
      screen.getByText('Error : Something went wrong')
    ).toBeInTheDocument();
  });

  it('should render transactions when data is available', () => {
    const mockData = {
      transactions: [
        {
          id: '1',
          details: 'Payment',
          amount: 100,
          date: 1730326859371,
          user: { name: 'John Doe' },
        },
        {
          id: '2',
          details: 'Refund',
          amount: 50,
          date: 1730240603151,
          user: { name: 'Jane Smith' },
        },
      ],
    };

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: mockData,
    });

    render(<TransactionsPage />);

    expect(
      screen.getByText('Sistema de gestión de Ingresos y Gastos')
    ).toBeInTheDocument();
    expect(screen.getByText('Ingresos y egresos')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText(formatDate(1730326859371))).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Refund')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText(formatDate(1730240603151))).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
