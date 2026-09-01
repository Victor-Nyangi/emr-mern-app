import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Permission {
  resource: string;
  actions: string[];
  attributes: {
    department?: string[];
    patient_status?: string[];
    visit_type?: string[];
    data_sensitivity?: string[];
    time_restrictions?: {
      start_time?: string;
      end_time?: string;
    };
  };
  conditions: {
    own_patients_only: boolean;
    own_department_only: boolean;
    emergency_access: boolean;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: {
    _id: string;
    name: string;
    display_name: string;
  };
  department: string;
  employee_id: string;
  permissions: Permission[];
  allowedActions: Record<string, string[]>;
  departmentPermissions: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (userData: User & { token: string }) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  hasPermission: (resource: string, action: string, context?: any) => boolean;
  canRead: (resource: string, context?: any) => boolean;
  canWrite: (resource: string, context?: any) => boolean;
  canCreate: (resource: string, context?: any) => boolean;
  canDelete: (resource: string, context?: any) => boolean;
  hasAnyPermission: (resource: string) => boolean;
  isInDepartment: (department: string) => boolean;
  isAdmin: () => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: (userData) => {
        set({
          user: {
            _id: userData._id,
            name: userData?.name,
            email: userData.email,
            role: userData.role,
            department: userData.department,
            employee_id: userData.employee_id,
            permissions: userData.permissions,
            allowedActions: userData.allowedActions,
            departmentPermissions: userData.departmentPermissions,
          },
          token: userData.token,
          isAuthenticated: true,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // Permission checking methods
      hasPermission: (resource, action, context = {}) => {
        const { user } = get();
        if (!user) return false;

        const permission = user.permissions.find(p => p.resource === resource);
        if (!permission) return false;

        // Check if action is allowed
        if (!permission.actions.includes(action)) {
          return false;
        }

        // Check department restrictions
        if (permission.attributes.department && 
            permission.attributes.department.length > 0) {
          if (!permission.attributes.department.includes(user.department)) {
            return false;
          }
        }

        // Check patient status restrictions
        if (context.patientStatus && 
            permission.attributes.patient_status && 
            permission.attributes.patient_status.length > 0) {
          if (!permission.attributes.patient_status.includes(context.patientStatus)) {
            return false;
          }
        }

        // Check visit type restrictions
        if (context.visitType && 
            permission.attributes.visit_type && 
            permission.attributes.visit_type.length > 0) {
          if (!permission.attributes.visit_type.includes(context.visitType)) {
            return false;
          }
        }

        // Check data sensitivity restrictions
        if (context.dataSensitivity && 
            permission.attributes.data_sensitivity && 
            permission.attributes.data_sensitivity.length > 0) {
          if (!permission.attributes.data_sensitivity.includes(context.dataSensitivity)) {
            return false;
          }
        }

        // Check emergency access
        if (context.isEmergency && !permission.conditions.emergency_access) {
          return false;
        }

        // Check time restrictions
        if (permission.attributes.time_restrictions) {
          const now = new Date();
          const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          
          const { start_time, end_time } = permission.attributes.time_restrictions;
          if (start_time && end_time) {
            if (currentTime < start_time || currentTime > end_time) {
              return false;
            }
          }
        }

        return true;
      },

      canRead: (resource, context) => {
        return get().hasPermission(resource, 'read', context);
      },

      canWrite: (resource, context) => {
        return get().hasPermission(resource, 'write', context);
      },

      canCreate: (resource, context) => {
        return get().hasPermission(resource, 'create', context);
      },

      canDelete: (resource, context) => {
        return get().hasPermission(resource, 'delete', context);
      },

      hasAnyPermission: (resource) => {
        const { user } = get();
        if (!user) return false;
        return user.permissions.some(p => p.resource === resource);
      },

      isInDepartment: (department) => {
        const { user } = get();
        if (!user) return false;
        return user.department === department || user.departmentPermissions.includes(department);
      },

      isAdmin: () => {
        const { user } = get();
        if (!user) return false;
        return user.role.name === 'admin';
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 