import { Outlet} from "react-router-dom";
import NavBar from "../pages/Shared/Navbar/NavBar";

const Main = () => {
    const noHeader= location.pathname.includes('register');
    return (
        <div>
            {noHeader || <NavBar></NavBar>}
            <Outlet></Outlet> 
        </div>
    );
};

export default Main;