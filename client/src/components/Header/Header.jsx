import "./Header.css";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react"

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { pathname } = useLocation()

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const loggedInStatus = () => {
    const logInstatus = localStorage.getItem("token")
    if (logInstatus) {
      setIsLoggedIn(true)
    }
  }
  useEffect(() => {
    loggedInStatus()
  }, [pathname])

  const logout = () => {
    localStorage.removeItem("token")
    isLoggedIn(false)
  }



  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">Uphaar</div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Menu />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products" >Product</NavLink>
            </li>
            <li>
              <NavLink to="/myaccount/myorder">Account</NavLink>
            </li>
            {
              isLoggedIn ?
                <li>
                  <NavLink to="/logout" onClick={logout}>Logout</NavLink>
                </li> :
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
