# react-authorization

This Library provides hooks and HOCs to easily handle authorizations in yout react application.
Since it just dependes on reacts context and hooks its very lightweight.

## Install
```sh
npm install react-auhtorization-handler
```

## Getting startet
 
Wrap your root component in AuthorizationProvider to pass the context and set the default-/initialRole.
If you are using Typescript you can pass a Permission Type to the Role.
To check Authorization, use the AuthorizationChecker Component.

```tsx
type Permissions = "askForTest" | "doThis" | "doThat";
const defaultRole: Role<TestPermissions> = {
  name: "Guest",
  permissions: ["askForTest"]
};
function App(){
  return(
    <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker<Permissions> requiredPermission="doThis">
          <div>
            <h1>This won't be shown</h1>
          </div>
        </AuthorizationChecker>
    </AuthorizationProvider>)}
```

```tsx
type Permissions = "askForTest" | "doThis" | "doThat";
const defaultRole: Role<TestPermissions> = {
  name: "Guest",
  permissions: ["askForTest"]
};
function App(){
  return(
    <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker<Permissions> requiredPermission="doThis" fallback={ <div><h1>Fallback</h1></div>}>
          <div>
            <h1>The Fallback will be shown</h1>
          </div>
        </AuthorizationChecker>
    </AuthorizationProvider>)}
```

```tsx
type Permissions = "askForTest" | "doThis" | "doThat";
const defaultRole: Role<TestPermissions> = {
  name: "Guest",
  permissions: ["askForTest"]
};
function App(){
  return(
    <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker<Permissions> requiredRole="Guest">
          <div>
            <h1>This would be shown</h1>
          </div>
        </AuthorizationChecker>
    </AuthorizationProvider>)}
```

```tsx
type Permissions = "askForTest" | "doThis" | "doThat";
const defaultRole: Role<TestPermissions> = {
  name: "Guest",
  permissions: ["askForTest"]
};
function App(){
  return(
    <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker<Permissions> allowedRoles={["Admin","User"]}>
          <div>
            <h1>This won't be shown</h1>
          </div>
        </AuthorizationChecker>
    </AuthorizationProvider>)}
```

```tsx
function YourComponent() {
  const {authentificate,executeIfGranted,hasPermission,isAllowedRole,isRequiredRole } = useAuthority<Permissions>();
  const onLogin=()=>{
    ...
    userRole:Role<Permssions>={name:"Admin",permssions:["doThis","doThat"]}
    authentificate(userRole)
  }
  return ...
}

```
## References

### Types
#### Role<P extends string>(P is a Permission type)
| Property    | type   | description                                        |
| ----------- | ------ | -------------------------------------------------- |
| name        | string | name of the role                                   |
| permissions | P[]    | list of permissions which are granted for the role |

### Components
#### AuthorizationProvider
| Property    | type    | default      | description                                                    |
| ----------- | ------- | ------------ | -------------------------------------------------------------- |
| initialRole | Role<P> | {name:Guest} | the default role which is used before authentificate is called |

#### AuthorizationChecker
| Property           | type             | description                                                                  |
| ------------------ | ---------------- | ---------------------------------------------------------------------------- |
| allowedRoles       | string[]         | a list of roles whoch are allowed to see the wrapped component               |
| fallback           | ReacNode         | a react component which should be rendered instead the wrapped one if denied |
| requiredPermission | P extends string | the permission which is required to see the wrapped component                |
| requiredRole       | string           | a role which is required to see the wrapped component                        |

### Hooks
```ts
ExecuteIfGrantedOptions{                 |
      allowedRoles?: string[];
      onDenied?: () => void;
      requiredPermission?: P;
      requiredRole?: string;
    }
```
#### useAuthorization<P extends string>()
returns:
| Property         | type                                            | description                                       |
| ---------------- | ----------------------------------------------- | ------------------------------------------------- |
| authentificate   | (role:Role<P>):void                             | function to authentificate with a new role        |
| executeIfGranted | (()=>any,options:ExecuteIfGrantedOptions ):void | function to run functionif it is granted          |
| hasPermission    | (permission:P extends string):boolean           | function to check if role has permission          |
| isAllowedRole    | ( allowedRoles:string[] ):boolean               | function to check if current roleis allowed role  |
| isRequiredRole   | (requiredRole:string):boolean                   | function to check if current role is reuired role |


