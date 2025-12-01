import { useAuthStore } from '@/store';
import permissions from '@/constants/permissions';

export function usePermission() {
  const authStore = useAuthStore();

  // Extract permissions
  const getPermissions = () => authStore.user?.role?.permissions ?? [];

  /**
   * Check if the user has a specific permission
   */
  const hasPermission = (permission) => {
    return getPermissions().includes(permission);
  };

  /**
   * Check if user has any of the given permissions
   */
  const hasAnyPermission = (permissionList = []) => {
    return permissionList.some((perm) => hasPermission(perm));
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (roleName) => {
    return authStore.user?.role?.name === roleName;
  };

  /**
   *  Check if user has one of the given roles
   */
  const hasAnyRole = (roleList = []) => {
    return roleList.includes(authStore.user?.role?.name);
  };

  /**
   * Universal check:
   */
  const can = (permissionOrList) => {
    if (Array.isArray(permissionOrList)) {
      return hasAnyPermission(permissionOrList);
    }
    return hasPermission(permissionOrList);
  };

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasRole,
    hasAnyRole,
    can,
  };
}
