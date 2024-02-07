import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/action";

const Navbar = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.main}>
      <div>
        <button>Dashboard</button>
      </div>
      <div>
        {token ? (
          <button onClick={handleLogout}>logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
