import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";
import Footer from "../components/footer";

function SharedLayout() {
  return (
    <div className="bg">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default SharedLayout;
