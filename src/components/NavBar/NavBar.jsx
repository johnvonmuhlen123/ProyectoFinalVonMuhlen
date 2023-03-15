import React from "react";
import CartWidget from "../CartWidget/CartWidget";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import styles from "./navbar.module.css";

const NavBar = () => {
  //const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container-fluid">
          <Link to={"/"} className={`navbar-brand ${styles.title}`}>
            Spice and Dance
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to={"/"}
                  className="nav-link"
                  activeClassName={styles.active}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/category/jewelery"}
                  className="nav-link"
                  activeClassName={styles.active}
                >
                  Jewelry
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/category/${encodeURIComponent("men's clothing")}`}
                  className="nav-link"
                  activeClassName={styles.active}
                >
                  Men's Clothing
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/category/${encodeURIComponent("women's clothing")}`}
                  className="nav-link"
                  activeClassName={styles.active}
                >
                  Women's Clothing
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/category/electronics"}
                  className="nav-link"
                  activeClassName={styles.active}
                >
                  Electronics
                </NavLink>
              </li>
            </ul>
            <CartWidget />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
