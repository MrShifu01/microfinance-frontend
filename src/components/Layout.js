import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    // Main container for the layout, with padding and responsive width
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-7xl mx-auto">
      {/* Include the header component */}
      <Header />
      {/* Outlet is a placeholder for rendered child routes */}
      {/* The child components of this layout will be rendered here */}
      <Outlet />
    </div>
  );
};

export default Layout;
