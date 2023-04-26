import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";
import Footer from "../components/footer";

function SharedLayout() {
  return (
    <div className="bg w-full min-h-screen bg-[url('../src/images/william-daigneault-ju3eqN0gl6Y-unsplash.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="overlay bg-zinc-600/60 w-full h-full">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default SharedLayout;
