import { useContext } from "react";
import { Role } from "../models/Role";
import { AuthentificationContext } from "../context/AuthentificationContext";

export const useAuthority = <P extends string>() => {
  const { role, setRole } = useContext(AuthentificationContext);
  const authentificate = (newRole: Role<P>) => {
    setRole(newRole);
  };
  const hasPermission = (permission: P) => {
    const { permissions = [] } = role;
    return permissions.includes(permission);
  };
  const isRequiredRole = (requiredRole: string) => {
    return role.name === requiredRole;
  };
  const isAllowedRole = (allowedRoles: string[]) => {
    return allowedRoles.includes(role.name);
  };
  const executeIfGranted = (
    executable: () => any,
    {
      allowedRoles,
      onDenied,
      requiredRole,
      requiredPermission
    }: {
      allowedRoles?: string[];
      onDenied?: () => void;
      requiredPermission?: P;
      requiredRole?: string;
    }
  ) => {
    const isGranted =
      (requiredRole === undefined &&
        requiredPermission === undefined &&
        allowedRoles === undefined) ||
      (requiredRole !== undefined && isRequiredRole(requiredRole)) ||
      (requiredPermission !== undefined && hasPermission(requiredPermission)) ||
      (allowedRoles !== undefined && isAllowedRole(allowedRoles));

    if (isGranted) {
      return executable();
    }
    if (onDenied) {
      return onDenied();
    }
    return null;
  };

  return {
    authentificate,
    executeIfGranted,
    hasPermission,
    isAllowedRole,
    isRequiredRole
  };
};
