import { Outlet, useNavigation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import NavBarItem from "../components/NavBar/NavBarItem/NavBarItem";
import Loader from "./Loader";
import { useAuthCont } from "../context/AuthContext";
import styled from "styled-components";

const Styledbg = styled.div`
  background-image: url(img/home.jpg);
  background-color: #cccccc;
  min-height: 94vh;
  width: 100%;
  background-size: cover;

`;
function AppLayout() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isLoading = navigation.state === "loading";
  const { isAuth, logout } = useAuthCont();

  const handleAuthAction = () => {
    if (isAuth) {
      logout();
      navigate("/"); // Redirect to home on logout
    } else {
      navigate("/auth/login"); // Redirect to login page
    }
  };

  return (
    <div className="App">
      {isLoading && <Loader />}
      <NavBar>
        <NavBarItem title="Home" to="/" />
        <NavBarItem title="fishes" to="/fishes" />
        <NavBarItem title="About" to="/about" />
        <NavBarItem title="Contact" to="/contact" />
        <button className="text-white" onClick={handleAuthAction}>
          {isAuth ? "Log out" : "Log in"}
        </button>
      </NavBar>
      <Styledbg><Outlet /></Styledbg>
      
    </div>
  );
}

export default AppLayout;
