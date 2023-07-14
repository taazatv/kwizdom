import React from "react";
import "./Header.css";

import { FiMenu, FiSearch } from "../../icons.js";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <main className="head-container">
        <div className="header">
          <Link to="/search" style={{textDecoration:"none",color:"var(--color-white)"}}><h1>KWiZDoM</h1></Link>

          <div>
            <p>Home</p>
            <p>About Kwizdom</p>
            <p>About GRSE</p>
            <p>Contact Us</p>

            <div>
              <FiMenu />
            </div>

            <div>
              <FiSearch />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}

        <div className="mobile-header">
          <div>
            <FiMenu />
          </div>
        </div>
      </main>
    </>
  );
};

export default Header;
