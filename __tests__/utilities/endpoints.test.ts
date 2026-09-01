import {
  SERVER_URL,
  LOGIN_ENDPOINT,
  REGISTRATION_ENDPOINT,
  PATIENTS_ENDPOINT,
  VISITS_ENDPOINT,
  GRAPHQL_ENDPOINT,
} from '@/utilities/endpoints'

describe('Endpoints', () => {
  test('should export SERVER_URL', () => {
    expect(SERVER_URL).toBeDefined()
  })

  test('should have correct auth endpoints', () => {
    expect(LOGIN_ENDPOINT).toBe('/auth/login')
    expect(REGISTRATION_ENDPOINT).toBe('/auth/register/')
  })

  test('should have correct data endpoints', () => {
    expect(PATIENTS_ENDPOINT).toBe('/patients/')
    expect(VISITS_ENDPOINT).toBe('/visits/')
  })

  test('should have correct GraphQL endpoint', () => {
    expect(GRAPHQL_ENDPOINT).toBe('/graphql')
  })

  test('should have string values for all endpoints', () => {
    const endpoints = [
      LOGIN_ENDPOINT,
      REGISTRATION_ENDPOINT,
      PATIENTS_ENDPOINT,
      VISITS_ENDPOINT,
      GRAPHQL_ENDPOINT,
    ]

    endpoints.forEach(endpoint => {
      expect(typeof endpoint).toBe('string')
      expect(endpoint.length).toBeGreaterThan(0)
    })
  })

  test('should start with forward slash', () => {
    const endpoints = [
      LOGIN_ENDPOINT,
      REGISTRATION_ENDPOINT,
      PATIENTS_ENDPOINT,
      VISITS_ENDPOINT,
      GRAPHQL_ENDPOINT,
    ]

    endpoints.forEach(endpoint => {
      expect(endpoint.startsWith('/')).toBe(true)
    })
  })
}) 