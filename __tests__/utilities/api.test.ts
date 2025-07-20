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

    test('should return empty results on error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await getData('/test-endpoint')

      expect(result).toEqual({ results: [] })
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
            Authorization: 'Bearer undefined',
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

    test('should return empty object on error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await postData('/test-endpoint', { test: 'data' })

      expect(result).toEqual({})
    })
  })
}) 