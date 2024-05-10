import {Outlet} from "react-router-dom";
import {Navbar} from "../components/navbar";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";

const MainLayout = () => {
    return <>
        <Header />
        <Navbar />
        <Outlet />
        <br />
        <Footer />
    </>
};

export default MainLayout;
