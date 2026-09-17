import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const tickerItems = [
    "TAAZA TV",
    "PRESENTS",
    "KWIZDOM 4.0",
    "THE ULTIMATE QUIZ COMPETITION",
    "RESULTS PUBLISHED FOR:",
    "Aditya Academy Barasat",
    "DPS NEWTOWN",
"GD Birla Center For Education",
"Hariyana Vidya Mandir",
"LA MARTINIERE FOR BOYS",
"LA MARTINIERE FOR GIRLS",
"MAHESWARI BALIKA VIDYALAYA",
"NOPANY HIGH",
"SOUTH CITY INTERNATIONAL",
"St.Josephs College",
  ];

  return (
    <header className="head-container">

      {/* ================= NAVBAR ================= */}
      <div className="header">

        <Link to="/search" className="header-logo">
          KWiZDoM
        </Link>

        <nav className="header-nav">

          <Link
            to="/search"
            className="header-link active"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="header-link"
          >
            <span className="desktop-about">
              About Kwizdom
            </span>

            <span className="mobile-about">
              About
            </span>
          </Link>

          <a
            href="https://taazatv.com/contact.php"
            target="_blank"
            rel="noopener noreferrer"
            className="header-link"
          >
            Contact Us
          </a>

        </nav>

      </div>


      {/* ================= RED TICKER ================= */}
      <div className="kwizdom-ticker">

        <div className="kwizdom-ticker-track">

          {[...tickerItems, ...tickerItems].map(
            (item, index) => (
              <span key={index}>
                • {item}
              </span>
            )
          )}

        </div>

      </div>

    </header>
  );
};

export default Header;