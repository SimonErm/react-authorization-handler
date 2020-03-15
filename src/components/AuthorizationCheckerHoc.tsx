import React, { ReactNode } from "react";
import { useAuthority } from "../hooks/AuthorityHook";

export function AuthorizationChecker<P extends string>({
  allowedRoles,
  children,
  fallback,
  requiredRole,
  requiredPermission
}: {
  allowedRoles?: string[];
  fallback?: React.ReactElement;
  requiredPermission?: P;
  requiredRole?: string;
  children: ReactNode;
}) {
  const { hasPermission, isRequiredRole, isAllowedRole } = useAuthority();
  const isGranted =
    (requiredRole === undefined &&
      requiredPermission === undefined &&
      allowedRoles === undefined) ||
    (requiredRole !== undefined && isRequiredRole(requiredRole)) ||
    (requiredPermission !== undefined && hasPermission(requiredPermission)) ||
    (allowedRoles !== undefined && isAllowedRole(allowedRoles));

  if (isGranted) {
    return <>{children}</>;
  }
  if (fallback) {
    return fallback;
  }
  return null;
}
