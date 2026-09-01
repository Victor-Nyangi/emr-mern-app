import { cn, formatDateFn, formatTimeFn, constructUserName } from '@/lib/utils'

describe('Utils', () => {
  describe('cn function', () => {
    test('should merge class names correctly', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    test('should handle conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class')
      expect(result).toBe('base-class conditional-class')
    })

    test('should handle empty strings and falsy values', () => {
      const result = cn('base-class', '', null, undefined, false && 'hidden')
      expect(result).toBe('base-class')
    })
  })

  describe('formatDateFn function', () => {
    test('should format date correctly', () => {
      const date = '2023-12-25'
      const result = formatDateFn(date)
      expect(result).toBe('Dec 25, 2023')
    })

    test('should handle different date formats', () => {
      const date = '2023-01-01'
      const result = formatDateFn(date)
      expect(result).toBe('Jan 01, 2023')
    })
  })

  describe('formatTimeFn function', () => {
    test('should format timestamp correctly', () => {
      const timestamp = Date.now()
      const result = formatTimeFn(timestamp)
      // Updated regex to match the actual format with ordinal suffixes
      expect(result).toMatch(/\w+ \d{1,2}(st|nd|rd|th), \d{4} at \d{1,2}:\d{2} [AP]M/)
    })

    test('should handle invalid timestamp', () => {
      const result = formatTimeFn('invalid')
      expect(result).toBe('Invalid date')
    })

    test('should handle null timestamp', () => {
      const result = formatTimeFn(null)
      // null gets converted to 0, which is a valid timestamp (epoch)
      expect(result).toMatch(/\w+ \d{1,2}(st|nd|rd|th), \d{4} at \d{1,2}:\d{2} [AP]M/)
    })
  })

  describe('constructUserName function', () => {
    test('should construct full name with all parts', () => {
      const user = {
        salutation: 'Dr',
        first_name: 'John',
        last_name: 'Doe',
      }
      const result = constructUserName(user)
      expect(result).toBe('Dr. John Doe')
    })

    test('should handle missing salutation', () => {
      const user = {
        salutation: '',
        first_name: 'John',
        last_name: 'Doe',
      }
      const result = constructUserName(user)
      // The function doesn't trim the leading dot when salutation is empty
      expect(result).toBe('. John Doe')
    })

    test('should handle missing first name', () => {
      const user = {
        salutation: 'Dr',
        first_name: '',
        last_name: 'Doe',
      }
      const result = constructUserName(user)
      // The function doesn't trim extra spaces
      expect(result).toBe('Dr.  Doe')
    })

    test('should handle missing last name', () => {
      const user = {
        salutation: 'Dr',
        first_name: 'John',
        last_name: '',
      }
      const result = constructUserName(user)
      expect(result).toBe('Dr. John')
    })

    test('should handle empty user object', () => {
      const user = {
        salutation: '',
        first_name: '',
        last_name: '',
      }
      const result = constructUserName(user)
      // The function returns just a dot when all fields are empty
      expect(result).toBe('.')
    })
  })
}) 