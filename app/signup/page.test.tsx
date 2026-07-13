import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpPage from './page';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/auth-client', () => ({
  authClient: {
    useSession: jest.fn(),
    signUp: {
      email: jest.fn(),
    },
    signIn: {
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

describe('Sign Up Page', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (authClient.useSession as jest.Mock).mockReturnValue({ data: null, isPending: false });
    
  });

  it('renders sign up form elements', () => {
    render(<SignUpPage />);
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Github/i })).toBeInTheDocument();
  });

  it('redirects if user is already authenticated', () => {
    (authClient.useSession as jest.Mock).mockReturnValue({ data: { user: { id: '123' } }, isPending: false });
    render(<SignUpPage />);
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('shows loading state when session is pending', () => {
    (authClient.useSession as jest.Mock).mockReturnValue({ data: null, isPending: true });
    render(<SignUpPage />);
    expect(screen.queryByText('Create an Account')).not.toBeInTheDocument();
  });

  it('shows validation error for weak password', async () => {
    render(<SignUpPage />);
    
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'weak' } }); // < 8 characters
    
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    
    await waitFor(() => {
      // signupSchema validation should catch this before calling authClient
      expect(authClient.signUp.email).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('handles email sign up successfully', async () => {
    (authClient.signUp.email as jest.Mock).mockResolvedValue({ data: { user: { id: '1' } }, error: null });
    render(<SignUpPage />);
    
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'StrongPass123!' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    
    await waitFor(() => {
      expect(authClient.signUp.email).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'StrongPass123!',
        callbackURL: '/dashboard'
      });
      expect(toast.success).toHaveBeenCalledWith('Account created! Redirecting...');
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles email sign up error from authClient', async () => {
    (authClient.signUp.email as jest.Mock).mockResolvedValue({ error: { message: 'Email already exists' } });
    render(<SignUpPage />);
    
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'StrongPass123!' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email already exists');
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('handles social sign up (google)', async () => {
    (authClient.signIn.social as jest.Mock).mockResolvedValue({ error: null });
    render(<SignUpPage />);
    
    fireEvent.click(screen.getByRole('button', { name: /Google/i }));
    
    await waitFor(() => {
      expect(authClient.signIn.social).toHaveBeenCalledWith({
        provider: 'google',
        callbackURL: '/dashboard'
      });
    });
  });

  it('toggles password visibility', () => {
    render(<SignUpPage />);
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    const toggleButton = screen.getByRole('button', { name: /Show password/i });
    fireEvent.click(toggleButton);
    
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
