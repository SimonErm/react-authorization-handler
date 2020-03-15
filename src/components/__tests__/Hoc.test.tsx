import React from "react";
import renderer from "react-test-renderer";
import { AuthorizationProvider } from "../AuthorizationProviderHoc";
import { AuthorizationChecker } from "../AuthorizationCheckerHoc";
import { Role } from "../../models/Role";
type TestPermissions = "askForTest" | "doThis" | "doThat";
const defaultRole: Role<TestPermissions> = {
  name: "Guest",
  permissions: ["askForTest"]
};
describe("Test ProviderHoc", () => {
  test("Target should be null", () => {
    const component = renderer.create(
      <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker requiredPermission="test">
          <div>
            <h1>isGranted</h1>
          </div>
        </AuthorizationChecker>
      </AuthorizationProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Target should be Fallback", () => {
    const component = renderer.create(
      <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker
          requiredPermission="test"
          fallback={
            <div>
              <h1>Fallback</h1>
            </div>
          }
        >
          <div>
            <h1>isGranted</h1>
          </div>
        </AuthorizationChecker>
      </AuthorizationProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("[requiredPermission]Target should be rendered by permission", () => {
    const component = renderer.create(
      <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker<TestPermissions> requiredPermission="askForTest">
          <div>
            <h1>isGranted</h1>
          </div>
        </AuthorizationChecker>
      </AuthorizationProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("[requiredRole]Target should be rendered by role", () => {
    const component = renderer.create(
      <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker requiredRole="Guest">
          <div>
            <h1>isGranted</h1>
          </div>
        </AuthorizationChecker>
      </AuthorizationProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("[requiredRole]Target should not be rendered by role", () => {
    const component = renderer.create(
      <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker<TestPermissions> requiredRole="Admin">
          <div>
            <h1>isGranted</h1>
          </div>
        </AuthorizationChecker>
      </AuthorizationProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("[allowedRoles]Target should be rendered by role", () => {
    const component = renderer.create(
      <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker allowedRoles={["Guest", "Another"]}>
          <div>
            <h1>isGranted</h1>
          </div>
        </AuthorizationChecker>
      </AuthorizationProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("[allowedRoles]Target should not be rendered by role", () => {
    const component = renderer.create(
      <AuthorizationProvider initialRole={defaultRole}>
        <AuthorizationChecker allowedRoles={["Admin", "Another"]}>
          <div>
            <h1>isGranted</h1>
          </div>
        </AuthorizationChecker>
      </AuthorizationProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
