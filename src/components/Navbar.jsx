import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/action";

const Navbar = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.role);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const createBooks = () => {
    navigate("/createbooks");
  };

  return (
    <div className={styles.main}>
      <div>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
      </div>
      <div>
        {role === "CREATOR" ? (
          <button onClick={createBooks}>Create books</button>
        ) : (
          ""
        )}
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
