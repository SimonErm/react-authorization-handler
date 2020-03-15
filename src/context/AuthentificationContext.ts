import * as React from "react";
import { Role } from "../models/Role";

export const AuthentificationContext = React.createContext({
  role: {
    name: "Guest"
  } as Role<string>,
  setRole: (role: Role<string>) => {
    console.warn(`Can't set role:${role.name}, becausee no setter is provided`);
  }
});
