import { getData, postData, loginSubmitHandler } from '@/utilities/api'

// Mock the fetch function
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('API Utilities', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  describe('loginSubmitHandler', () => {
    test('should make POST request to login endpoint', async () => {
      const mockResponse = { token: 'test-token', user: { id: 1 } }
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await loginSubmitHandler({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        })
      )
      expect(result).toEqual(mockResponse)
    })

    test('should handle login errors', async () => {
      const mockError = { error: 'Invalid credentials' }
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockError),
      })

      const result = await loginSubmitHandler({
        email: 'test@example.com',
        password: 'wrongpassword',
      })

      expect(result).toEqual(mockError)
    })
  })

  describe('getData', () => {
    test('should make GET request with auth header', async () => {
      const mockResponse = { results: [{ id: 1, name: 'Test' }] }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await getData('/test-endpoint')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test-endpoint'),
        expect.objectContaining({
          method: 'GET',
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          }),
        })
      )
      expect(result).toEqual(mockResponse)
    })

    test('should propagate network errors instead of returning an empty list', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      // Returning { results: [] } here rendered a backend outage as an
      // empty table with no indication anything had gone wrong.
      await expect(getData('/test-endpoint')).rejects.toThrow('Network error')
    })

    test('should surface the server error message on a non-OK response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: jest.fn().mockResolvedValueOnce({ message: 'database is on fire' }),
      })

      await expect(getData('/test-endpoint')).rejects.toThrow(
        'database is on fire'
      )
    })

    test('should still error usefully when the body is not JSON', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 502,
        statusText: 'Bad Gateway',
        json: jest.fn().mockRejectedValueOnce(new SyntaxError('Unexpected token <')),
      })

      await expect(getData('/test-endpoint')).rejects.toThrow('502')
    })
  })

  describe('postData', () => {
    test('should make POST request with payload', async () => {
      const mockResponse = { success: true, id: 1 }
      const payload = { name: 'Test Item', description: 'Test Description' }
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await postData('/test-endpoint', payload)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test-endpoint'),
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            // Was 'Bearer undefined': postHandler read the cookie with
            // nookies, which returns {} when it runs as a Server Action,
            // so every authenticated mutation went out unauthenticated.
            Authorization: 'Bearer test-token',
          }),
          body: JSON.stringify(payload),
        })
      )
      expect(result).toEqual(mockResponse)
    })

    test('should handle different HTTP methods', async () => {
      const mockResponse = { success: true }
      const payload = { name: 'Test' }
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      await postData('/test-endpoint', payload, 'PUT')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'PUT',
        })
      )
    })

    test('should propagate errors instead of returning an empty object', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      // Returning {} made a failed save indistinguishable from a
      // successful one that happened to return nothing.
      await expect(
        postData('/test-endpoint', { test: 'data' })
      ).rejects.toThrow('Network error')
    })

    test('should surface the server error message so the form can show it', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: jest.fn().mockResolvedValueOnce({ message: 'email already exists' }),
      })

      await expect(
        postData('/test-endpoint', { test: 'data' })
      ).rejects.toThrow('email already exists')
    })
  })
}) 