import { Outlet, useLocation } from "react-router-dom";
import { StickyNavbar } from "../components/navbars/StickyNavbar";

import FooterF from "../components/Footer";

const NAVBAR_HEIGHT = 64; // px, adjust if your navbar is taller

const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <nav className="sticky top-0 z-10">
          <StickyNavbar />
        </nav>
        <main
          className="flex-grow"
          style={{ marginTop: isHomePage ? 0 : `${NAVBAR_HEIGHT}px` }}
        >
          <Outlet />
        </main>
        <FooterF />
      </div>
    </div>
  );
};

export default AppLayout;
