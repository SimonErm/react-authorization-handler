export interface Role<T extends string> {
  name: string;
  permissions?: T[];
}
