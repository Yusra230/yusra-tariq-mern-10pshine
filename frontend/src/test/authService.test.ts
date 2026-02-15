import {
  addUserToServer,
  loginToServer,
  forgotPasswordToServer,
  changePasswordOnServer,
} from '../services/authService';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('authService', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    localStorage.clear();
  });

  describe('addUserToServer', () => {
    test('returns user and token on success', async () => {
      const mockResponse = {
        user: { _id: '123', email: 'test@example.com', createdAt: '2023-01-01' },
        token: 'abc123',
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await addUserToServer({
        email: 'test@example.com',
        password: 'pass',
        confirmPassword: 'pass',
      });

      expect(result).toEqual({
        user: { id: '123', email: 'test@example.com', createdAt: '2023-01-01', lastLogin: null },
        token: 'abc123',
      });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/signup',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'pass',
            confirmPassword: 'pass',
          }),
        })
      );
    });

    test('throws error on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Email already exists' }),
      });

      await expect(
        addUserToServer({
          email: 'test@example.com',
          password: 'pass',
          confirmPassword: 'pass',
        })
      ).rejects.toThrow('Email already exists');
    });
  });

  describe('loginToServer', () => {
    test('returns user and token on success', async () => {
      const mockResponse = {
        user: { _id: '123', email: 'test@example.com', lastLogin: null },
        token: 'xyz789',
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await loginToServer({ email: 'test@example.com', password: 'pass' });
      expect(result).toEqual({
        user: { id: '123', email: 'test@example.com', lastLogin: null },
        token: 'xyz789',
      });
    });
  });

  describe('forgotPasswordToServer', () => {
    test('sends email and returns data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Reset link sent' }),
      });

      const result = await forgotPasswordToServer('test@example.com');
      expect(result).toEqual({ message: 'Reset link sent' });
    });
  });

  describe('changePasswordOnServer', () => {
    test('sends token in Authorization header', async () => {
      localStorage.setItem('token', 'fake-jwt');
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await changePasswordOnServer({ currentPassword: 'old', newPassword: 'new' });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/change-password',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer fake-jwt',
          },
        })
      );
    });
  });
});