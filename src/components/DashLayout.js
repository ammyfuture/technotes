import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

// so this is the layout for the protected part of our site and the other is for the public parts so once i log in the header and the footer will be the same comp and the main represented with outlet will be the main and will have diff comp there that will be living nested under the dash layout
const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash-container">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};
export default DashLayout;

// am assuming dash layout means dashboard?

// so here we have the container for the dash, it holds the header and footer and inside we have outlets for all the other comps that will be warped by the dashLayout
