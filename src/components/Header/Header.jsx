import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const tickerItems = [
    "TAAZA TV PRESENTS KWIZDOM 4.0 THE ULTIMATE QUIZ COMPETITION, RESULTS PUBLISHED FOR: ",
"Aditya Academy Barasat",
"BALIKA SIKSHA SADAN",
"Central Modern School BARANAGAR",
"DPS NEWTOWN",
"GD Birla Center For Education",
"GYAN BHARATI VIDYALAYA (ENGLISH MEDIUM)",
"GYAN BHARATI VIDYAPITH",
"GYAN BHARTI BALIKA VIDYALAYA",
"Hariyana Vidya Mandir",
"Heritage Academy High School",
"LA MARTINIERE FOR BOYS",
"LA MARTINIERE FOR GIRLS",
"LABONYA PUBLIC SCHOOL",
"MAHESWARI BALIKA VIDYALAYA",
"MARWARI BALIKA VIDYALAYA",
"NOPANY HIGH",
"RAJASTHAN VIDYA MANDIR",
"SHREE BALKRISHNA VITHALNATH VIDYALAYA",
"SHREE DIDOO MAHESWARI PANCHAYAT VIDYALAYA",
"SHREE DIGAMBAR JAIN VIDYALAYA",
"SHREE JAIN SWETAMBER TERAPANTHI   VIDAYALAYA",
"Shree Jain Vidyalaya (Girls)",
"Shree Jain Vidyalaya Boys",
"SHREE MAHESWARI VIDYALAYA",
"SHREE VISHUDDHANAND SARASWATI VIDYALAYA",
"SHRI_BALKRISHNA_VITTHALNATH_BALIKA_VIDYALAYA",
"SOUTH CITY INTERNATIONAL",
"ST. DENIS SCHOOL",
"St.Josephs College",
"TANTIA HIGH SCHOOL",
"THE CALCUTTA ANGLO GUJRATI",
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