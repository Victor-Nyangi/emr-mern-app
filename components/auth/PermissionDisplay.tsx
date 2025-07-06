import React from 'react';
import { useAuthStore } from '@/lib/auth-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const PermissionDisplay: React.FC = () => {
  const { user, hasPermission, canRead, canWrite, canCreate, canDelete, isAdmin, isInDepartment } = useAuthStore();

  if (!user) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>No user logged in</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const resources = ['patient', 'visit', 'appointment', 'medical_provider', 'billing', 'clinical_notes'];
  const actions = ['read', 'write', 'create', 'delete'];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Permissions</CardTitle>
        <CardDescription>
          {user.name} ({user.role.display_name}) - {user.department}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* User Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Role:</strong> {user.role.display_name}
          </div>
          <div>
            <strong>Department:</strong> {user.department}
          </div>
          <div>
            <strong>Employee ID:</strong> {user.employee_id}
          </div>
          <div>
            <strong>Admin:</strong> {isAdmin() ? 'Yes' : 'No'}
          </div>
        </div>

        <Separator />

        {/* Permission Matrix */}
        <div>
          <h4 className="font-semibold mb-2">Permission Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Resource</th>
                  {actions.map(action => (
                    <th key={action} className="text-center p-2 capitalize">{action}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resources.map(resource => (
                  <tr key={resource} className="border-b">
                    <td className="p-2 font-medium capitalize">{resource}</td>
                    {actions.map(action => {
                      const hasPerm = hasPermission(resource, action);
                      return (
                        <td key={action} className="text-center p-2">
                          <Badge variant={hasPerm ? "default" : "secondary"} className="text-xs">
                            {hasPerm ? "✓" : "✗"}
                          </Badge>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Separator />

        {/* Department Access */}
        <div>
          <h4 className="font-semibold mb-2">Department Access</h4>
          <div className="flex flex-wrap gap-2">
            {user.departmentPermissions.map(dept => (
              <Badge key={dept} variant="outline" className="text-xs">
                {dept}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Quick Permission Tests */}
        <div>
          <h4 className="font-semibold mb-2">Quick Permission Tests</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Can read visits:</strong> {canRead('visit') ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Can create patients:</strong> {canCreate('patient') ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Can write appointments:</strong> {canWrite('appointment') ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Can delete billing:</strong> {canDelete('billing') ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Emergency department access:</strong> {isInDepartment('emergency') ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Cardiology department access:</strong> {isInDepartment('cardiology') ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        <Separator />

        {/* Detailed Permissions */}
        <div>
          <h4 className="font-semibold mb-2">Detailed Permissions</h4>
          <div className="space-y-2">
            {user.permissions.map((permission, index) => (
              <div key={index} className="border rounded p-3 text-sm">
                <div className="font-medium capitalize mb-1">{permission.resource}</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {permission.actions.map(action => (
                    <Badge key={action} variant="secondary" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                </div>
                {permission.attributes.department && (
                  <div className="text-xs text-muted-foreground">
                    <strong>Departments:</strong> {permission.attributes.department.join(', ')}
                  </div>
                )}
                {permission.conditions.emergency_access && (
                  <div className="text-xs text-muted-foreground">
                    <strong>Emergency Access:</strong> Yes
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PermissionDisplay; 