import { render, screen, fireEvent } from '@testing-library/react';
import UsersPage from '@/pages/users';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';

// Mock de useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock de useQuery
jest.mock('@apollo/client', () => {
  const actualApolloClient = jest.requireActual('@apollo/client');
  return {
    ...actualApolloClient,
    useQuery: jest.fn(),
  };
});

describe('UsersPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loader when loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null,
    });

    render(<UsersPage />);

    const loader = document.querySelector('.animate-spin');
    expect(loader).toBeInTheDocument();
  });

  it('should render error message on Apollo error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: { message: 'Test Error' },
      data: null,
    });

    render(<UsersPage />);
    expect(screen.getByText('Error : Test Error')).toBeInTheDocument();
  });

  it('should render the user list when data is available', () => {
    const mockData = {
      users: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
        },
        {
          id: 2,
          name: 'Cyle Doe',
          email: 'cyle@example.com',
          phone: '123-456-7890',
        },
      ],
    };

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: mockData,
    });

    render(<UsersPage />);
    expect(
      screen.getByText('Sistema de gestión de Ingresos y Gastos')
    ).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();

    expect(screen.getByText('Cyle Doe')).toBeInTheDocument();
    expect(screen.getByText('cyle@example.com')).toBeInTheDocument();
  });

  it('should call router.push with correct URL when edit button is clicked', () => {
    const mockData = {
      users: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
        },
      ],
    };

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: mockData,
    });

    render(<UsersPage />);

    const editButton = screen.getByTestId('edit-1');
    fireEvent.click(editButton);

    expect(mockPush).toHaveBeenCalledWith('/users/1');
  });
});
