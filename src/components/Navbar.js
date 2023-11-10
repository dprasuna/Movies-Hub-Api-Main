import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [activeNavItem, setActiveNavItem] = useState("Home");

  const handleOnClickNavItem = (navItem) => {
    setActiveNavItem(navItem);
  };
  let burgerClick = document.querySelector(".BurgerClick");

  const handleOnClickBurger = () => {
    if (burgerClick.style.display === "block") {
      burgerClick.style.display = "none";
    } else {
      burgerClick.style.display = "block";
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="main-nav-box">
          <div className="title">
            <Link to="/">
              <h1>
                Movies<span className="hub">Hub</span>
              </h1>
            </Link>
          </div>
          <div className="nav-items-box">
            <Link
              className={`nav-item-1 nav-item ${
                activeNavItem === "Home" ? "nav-item-active" : ""
              }`}
              to="/"
              onClick={() => handleOnClickNavItem("Home")}
            >
              Home
            </Link>
            <Link
              className={`nav-item-2 nav-item ${
                activeNavItem === "Movies" ? "nav-item-active" : ""
              }`}
              to="/movies"
              onClick={() => handleOnClickNavItem("Movies")}
            >
              Movies
            </Link>
            <Link
              className={`nav-item-3 nav-item ${
                activeNavItem === "TV Shows" ? "nav-item-active" : ""
              }`}
              to="/tvshows"
              onClick={() => handleOnClickNavItem("TV Shows")}
            >
              TV Shows
            </Link>
            <Link
              className={`nav-item-4 nav-item ${
                activeNavItem === "Series" ? "nav-item-active" : ""
              }`}
              to="/series"
              onClick={() => handleOnClickNavItem("Series")}
            >
              Series
            </Link>
          </div>
        </div>

        <div className="burger" onClick={handleOnClickBurger}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="BurgerClick">
          <div className="burgerClick-box">
            <Link className="nav-item-burger" to="/">
              Home
            </Link>
          </div>
          <div className="burgerClick-box">
            <Link className="nav-item-burger" to="/movies">
              Movies
            </Link>
          </div>
          <div className="burgerClick-box">
            <Link className="nav-item-burger" to="/tvshows">
              TV Shows
            </Link>
          </div>
          <div className="burgerClick-box">
            <Link className="nav-item-burger" to="/series">
              Series
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
