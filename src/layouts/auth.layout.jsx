import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <>
      <p>AuthLayout</p>
      <Outlet />
    </>
  );
}

export default AuthLayout;
