import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Header.css";
const Header = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login");
    if (isLoggedIn) {
      setLogin(true);
    }
  }, [login]);
  return (
    <div className="header">
      <div className="header_left">PERSONAL DIARY</div>
      <div className="header_right">
        <Link to="/">HOME</Link>
        {login ? (
          <button
            onClick={() => {
              localStorage.clear();
              setLogin(false);
            }}
          >
            LOGOUT
          </button>
        ) : (
          <>
            <Link to="/login">LOGIN</Link>
            <Link to="/signup">SIGNUP</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
