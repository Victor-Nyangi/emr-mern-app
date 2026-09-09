import { ACCESS_TOKEN, USER_ID, NAME, EMAIL } from '@/utilities/constants'

describe('Constants', () => {
  test('should export correct constant values', () => {
    expect(ACCESS_TOKEN).toBe('__server_token__')
    expect(USER_ID).toBe('__user_id__')
    expect(NAME).toBe('__name__')
    expect(EMAIL).toBe('__email__')
  })

  test('should have string values', () => {
    expect(typeof ACCESS_TOKEN).toBe('string')
    expect(typeof USER_ID).toBe('string')
    expect(typeof NAME).toBe('string')
    expect(typeof EMAIL).toBe('string')
  })

  test('should not be empty strings', () => {
    expect(ACCESS_TOKEN.length).toBeGreaterThan(0)
    expect(USER_ID.length).toBeGreaterThan(0)
    expect(NAME.length).toBeGreaterThan(0)
    expect(EMAIL.length).toBeGreaterThan(0)
  })
}) 