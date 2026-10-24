import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInPage from './page';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/lib/auth-client', () => ({
  authClient: {
    useSession: jest.fn(),
    signIn: {
      email: jest.fn(),
      social: jest.fn(),
    },
  },
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/components/theme-toggle', () => ({ ThemeToggle: () => <div data-testid="theme-toggle" /> }));

describe('Sign In Page', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => {
        if (key === 'next') return null;
        return null;
      }),
    });
    (authClient.useSession as jest.Mock).mockReturnValue({ data: null, isPending: false });
  });

  it('renders sign in form elements', () => {
    render(<SignInPage />);
    expect(screen.getByText('FinVeda')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Github/i })).toBeInTheDocument();
  });

  it('redirects if user is already authenticated', () => {
    (authClient.useSession as jest.Mock).mockReturnValue({ data: { user: { id: '123' } }, isPending: false });
    render(<SignInPage />);
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('shows loading state when session is pending', () => {
    (authClient.useSession as jest.Mock).mockReturnValue({ data: null, isPending: true });
    render(<SignInPage />);
    // There shouldn't be the normal form
    expect(screen.queryByText('FinVeda')).not.toBeInTheDocument();
  });

  it('handles email sign in successfully', async () => {
    (authClient.signIn.email as jest.Mock).mockResolvedValue({ error: null });
    render(<SignInPage />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    
    await waitFor(() => {
      expect(authClient.signIn.email).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        callbackURL: '/dashboard'
      });
      expect(toast.success).toHaveBeenCalledWith('Signed in successfully!');
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles email sign in error', async () => {
    (authClient.signIn.email as jest.Mock).mockResolvedValue({ error: { message: 'Invalid credentials' } });
    render(<SignInPage />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('handles social sign in (google)', async () => {
    (authClient.signIn.social as jest.Mock).mockResolvedValue({ error: null });
    render(<SignInPage />);
    
    fireEvent.click(screen.getByRole('button', { name: /Google/i }));
    
    await waitFor(() => {
      expect(authClient.signIn.social).toHaveBeenCalledWith({
        provider: 'google',
        callbackURL: '/dashboard'
      });
    });
  });

  it('toggles password visibility', () => {
    render(<SignInPage />);
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    const toggleButton = screen.getByRole('button', { name: /Show password/i });
    fireEvent.click(toggleButton);
    
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    const toggleButtonHide = screen.getByRole('button', { name: /Hide password/i });
    fireEvent.click(toggleButtonHide);
    
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
