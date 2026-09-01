import { useAuthStore } from '@/lib/auth-store'

// Mock zustand persist
jest.mock('zustand/middleware', () => ({
  persist: (fn: any) => fn,
}))

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  })

  describe('State Management', () => {
    test('should have initial state', () => {
      const state = useAuthStore.getState()
      
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.isLoading).toBe(false)
      expect(state.error).toBeNull()
    })

    test('should login user correctly', () => {
      const userData = {
        _id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        token: 'test-token',
        role: {
          _id: 'role-1',
          name: 'doctor',
          display_name: 'Doctor',
        },
        department: 'cardiology',
        employee_id: 'EMP001',
        permissions: [],
        allowedActions: {},
        departmentPermissions: [],
      }

      useAuthStore.getState().login(userData)
      const state = useAuthStore.getState()

      expect(state.user).toEqual({
        _id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        role: userData.role,
        department: 'cardiology',
        employee_id: 'EMP001',
        permissions: [],
        allowedActions: {},
        departmentPermissions: [],
      })
      expect(state.token).toBe('test-token')
      expect(state.isAuthenticated).toBe(true)
      expect(state.error).toBeNull()
    })

    test('should logout user correctly', () => {
      // First login
      const userData = {
        _id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        token: 'test-token',
        role: { _id: '1', name: 'doctor', display_name: 'Doctor' },
        department: 'cardiology',
        employee_id: 'EMP001',
        permissions: [],
        allowedActions: {},
        departmentPermissions: [],
      }
      useAuthStore.getState().login(userData)

      // Then logout
      useAuthStore.getState().logout()
      const state = useAuthStore.getState()

      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.error).toBeNull()
    })

    test('should set loading state', () => {
      useAuthStore.getState().setLoading(true)
      expect(useAuthStore.getState().isLoading).toBe(true)

      useAuthStore.getState().setLoading(false)
      expect(useAuthStore.getState().isLoading).toBe(false)
    })

    test('should set and clear error', () => {
      useAuthStore.getState().setError('Test error')
      expect(useAuthStore.getState().error).toBe('Test error')

      useAuthStore.getState().clearError()
      expect(useAuthStore.getState().error).toBeNull()
    })
  })

  describe('Permission Checking', () => {
    const mockUser = {
      _id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      role: { _id: '1', name: 'doctor', display_name: 'Doctor' },
      department: 'cardiology',
      employee_id: 'EMP001',
      permissions: [
        {
          resource: 'patient',
          actions: ['read', 'write'],
          attributes: {
            department: ['cardiology'],
            patient_status: ['active'],
            visit_type: ['consultation'],
            data_sensitivity: ['normal'],
          },
          conditions: {
            own_patients_only: false,
            own_department_only: true,
            emergency_access: true,
          },
        },
      ],
      allowedActions: { patient: ['read', 'write'] },
      departmentPermissions: ['cardiology'],
    }

    beforeEach(() => {
      useAuthStore.getState().login({ ...mockUser, token: 'test-token' })
    })

    test('should check basic permissions', () => {
      const { hasPermission } = useAuthStore.getState()

      expect(hasPermission('patient', 'read')).toBe(true)
      expect(hasPermission('patient', 'write')).toBe(true)
      expect(hasPermission('patient', 'delete')).toBe(false)
      expect(hasPermission('visit', 'read')).toBe(false)
    })

    test('should check department restrictions', () => {
      const { hasPermission } = useAuthStore.getState()

      // The permission allows 'cardiology' department, and user is in 'cardiology'
      expect(hasPermission('patient', 'read')).toBe(true)

      // Create a user with different department
      const neurologyUser = {
        ...mockUser,
        department: 'neurology',
        permissions: [
          {
            ...mockUser.permissions[0],
            attributes: {
              ...mockUser.permissions[0].attributes,
              department: ['neurology'], // Only neurology allowed
            },
          },
        ],
      }
      useAuthStore.getState().login({ ...neurologyUser, token: 'test-token' })

      // Now the user is in neurology and permission allows neurology
      expect(hasPermission('patient', 'read')).toBe(true)

      // But if permission only allows cardiology, neurology user should be denied
      const restrictedUser = {
        ...neurologyUser,
        permissions: [
          {
            ...neurologyUser.permissions[0],
            attributes: {
              ...neurologyUser.permissions[0].attributes,
              department: ['cardiology'], // Only cardiology allowed
            },
          },
        ],
      }
      useAuthStore.getState().login({ ...restrictedUser, token: 'test-token' })
      expect(hasPermission('patient', 'read')).toBe(false)
    })

    test('should check patient status restrictions', () => {
      const { hasPermission } = useAuthStore.getState()

      expect(hasPermission('patient', 'read', { patientStatus: 'active' })).toBe(true)
      expect(hasPermission('patient', 'read', { patientStatus: 'inactive' })).toBe(false)
    })

    test('should check emergency access', () => {
      const { hasPermission } = useAuthStore.getState()

      expect(hasPermission('patient', 'read', { isEmergency: true })).toBe(true)
      expect(hasPermission('patient', 'read', { isEmergency: false })).toBe(true)
    })

    test('should return false for unauthenticated user', () => {
      useAuthStore.getState().logout()
      const { hasPermission } = useAuthStore.getState()

      expect(hasPermission('patient', 'read')).toBe(false)
    })

    test('should check convenience methods', () => {
      const { canRead, canWrite, canCreate, canDelete } = useAuthStore.getState()

      expect(canRead('patient')).toBe(true)
      expect(canWrite('patient')).toBe(true)
      expect(canCreate('patient')).toBe(false)
      expect(canDelete('patient')).toBe(false)
    })

    test('should check if user is admin', () => {
      const { isAdmin } = useAuthStore.getState()
      expect(isAdmin()).toBe(false)

      // Test with admin role
      const adminUser = {
        ...mockUser,
        role: { _id: '1', name: 'admin', display_name: 'Administrator' },
      }
      useAuthStore.getState().login({ ...adminUser, token: 'test-token' })
      expect(isAdmin()).toBe(true)
    })

    test('should check department membership', () => {
      const { isInDepartment } = useAuthStore.getState()

      expect(isInDepartment('cardiology')).toBe(true)
      expect(isInDepartment('neurology')).toBe(false)
    })
  })
}) 