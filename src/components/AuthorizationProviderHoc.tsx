import { AuthentificationContext } from "../context/AuthentificationContext";
import { FC, useState } from "react";
import { Role } from "../models/Role";
import * as React from "react";
export const AuthorizationProvider: FC<{ initialRole?: Role<string> }> = ({
  children,
  // eslint-disable-next-line react/prop-types
  initialRole = { name: "Guest" }
}) => {
  const [role, setRole] = useState(initialRole);

  return (
    <AuthentificationContext.Provider value={{ role, setRole }}>
      {children}
    </AuthentificationContext.Provider>
  );
};
