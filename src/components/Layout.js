import { Outlet } from "react-router-dom";

const Layout = () => {
  // just renders the children for now
  return <Outlet />;
};
export default Layout;

// not sure if there will be more later here but Layout is a warping comp that only renders the wrapped comps. So just outlet is here for now.
