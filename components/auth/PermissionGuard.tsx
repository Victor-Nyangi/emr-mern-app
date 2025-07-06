import React from 'react';
import { useAuthStore } from '@/lib/auth-store';

interface PermissionGuardProps {
  resource: string;
  action: string;
  context?: {
    department?: string;
    patientStatus?: string;
    visitType?: string;
    dataSensitivity?: string;
    isEmergency?: boolean;
  };
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  resource,
  action,
  context = {},
  children,
  fallback = null,
  showFallback = false
}) => {
  const hasPermission = useAuthStore(state => 
    state.hasPermission(resource, action, context)
  );

  if (hasPermission) {
    return <>{children}</>;
  }

  return showFallback ? <>{fallback}</> : null;
};

// Specific permission guards for common operations
export const CanRead: React.FC<Omit<PermissionGuardProps, 'action'> & { action?: string }> = ({
  resource,
  action = 'read',
  ...props
}) => (
  <PermissionGuard resource={resource} action={action} {...props} />
);

export const CanWrite: React.FC<Omit<PermissionGuardProps, 'action'> & { action?: string }> = ({
  resource,
  action = 'write',
  ...props
}) => (
  <PermissionGuard resource={resource} action={action} {...props} />
);

export const CanCreate: React.FC<Omit<PermissionGuardProps, 'action'> & { action?: string }> = ({
  resource,
  action = 'create',
  ...props
}) => (
  <PermissionGuard resource={resource} action={action} {...props} />
);

export const CanDelete: React.FC<Omit<PermissionGuardProps, 'action'> & { action?: string }> = ({
  resource,
  action = 'delete',
  ...props
}) => (
  <PermissionGuard resource={resource} action={action} {...props} />
);

// Resource-specific guards
export const CanReadPatient: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'patient',
  ...props
}) => (
  <PermissionGuard resource={resource} action="read" {...props} />
);

export const CanWritePatient: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'patient',
  ...props
}) => (
  <PermissionGuard resource={resource} action="write" {...props} />
);

export const CanCreatePatient: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'patient',
  ...props
}) => (
  <PermissionGuard resource={resource} action="create" {...props} />
);

export const CanDeletePatient: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'patient',
  ...props
}) => (
  <PermissionGuard resource={resource} action="delete" {...props} />
);

export const CanReadVisit: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'visit',
  ...props
}) => (
  <PermissionGuard resource={resource} action="read" {...props} />
);

export const CanWriteVisit: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'visit',
  ...props
}) => (
  <PermissionGuard resource={resource} action="write" {...props} />
);

export const CanCreateVisit: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'visit',
  ...props
}) => (
  <PermissionGuard resource={resource} action="create" {...props} />
);

export const CanDeleteVisit: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'visit',
  ...props
}) => (
  <PermissionGuard resource={resource} action="delete" {...props} />
);

export const CanReadAppointment: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'appointment',
  ...props
}) => (
  <PermissionGuard resource={resource} action="read" {...props} />
);

export const CanWriteAppointment: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'appointment',
  ...props
}) => (
  <PermissionGuard resource={resource} action="write" {...props} />
);

export const CanCreateAppointment: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'appointment',
  ...props
}) => (
  <PermissionGuard resource={resource} action="create" {...props} />
);

export const CanDeleteAppointment: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { resource?: string }> = ({
  resource = 'appointment',
  ...props
}) => (
  <PermissionGuard resource={resource} action="delete" {...props} />
);

// Admin guard
export const AdminOnly: React.FC<Omit<PermissionGuardProps, 'resource' | 'action'> & { 
  resource?: string;
  action?: string;
}> = ({ children, fallback, showFallback = false }) => {
  const isAdmin = useAuthStore(state => state.isAdmin());

  if (isAdmin) {
    return <>{children}</>;
  }

  return showFallback ? <>{fallback}</> : null;
};

// Department guard
export const DepartmentOnly: React.FC<{
  department: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showFallback?: boolean;
}> = ({ department, children, fallback, showFallback = false }) => {
  const isInDepartment = useAuthStore(state => state.isInDepartment(department));

  if (isInDepartment) {
    return <>{children}</>;
  }

  return showFallback ? <>{fallback}</> : null;
};

export default PermissionGuard; 