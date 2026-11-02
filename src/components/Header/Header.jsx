import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const tickerItems = [
    "TAAZA TV PRESENTS KWIZDOM 4.0 THE ULTIMATE QUIZ COMPETITION, RESULTS PUBLISHED FOR: ",
"ABHINAV BHARATI SCHOOL",
"AG MEMORIAL HIGH SCHOOL",
"AGRASAIN BALIKA SIKSHA SADAN",
"ALIPORE TAKSHAL VIDYAPEETH",
"ASHOK HALL GIRLS HIGH SCHOOL",
"AUTHPUR NATIONAL MODEL SCHOOL",
"Aditya Academy Barasat",
"BALIKA SIKSHA SADAN",
"CALCUTTA BOYS SCHOOL",
"Calcutta Public School(BAGUIHATI)",
"Central Modern School BARANAGAR",
"DIPTI BRIDGE WELL SCHOOL",
"DPS NEWTOWN",
"DPS RUBY PARK",
"Don Bosco Park Circus",
"EVERGREEN HIGH SCHOOL",
"GARULIA MILL HIGH SCHOOL",
"GD Birla Center For Education",
"GYAN BHARATI VIDYALAYA (ENGLISH MEDIUM)",
"GYAN BHARATI VIDYAPITH",
"GYAN BHARTI BALIKA VIDYALAYA",
"H C K JAIN VIDYALAYA",
"HOWRAH MODERN SCHOOL",
"Hariyana Vidya Mandir",
"Heritage Academy High School",
"I P MEMORIAL SCHOOL",
"JAGADTAL ANGLO INDIA HIGH SCHOOL",
"JAGAT DAL KAMALA HIGH SCHOOL",
"JAGATDAL SHRI HARI UCHCHA VIDYALAYA",
"Jagatdal Shams Urdu School",
"KANKINARA URDU GIRLS HIGH SCHOOL",
"KHANNA HIGH SCHOOL",
"LA MARTINIERE FOR BOYS",
"LA MARTINIERE FOR GIRLS",
"LABONYA PUBLIC SCHOOL",
"LAJPAT HINDI HIGH SCHOOL",
"MAHESWARI BALIKA VIDYALAYA",
"MAHESWARI GIRLS SCHOOL",
"MARWARI BALIKA VIDYALAYA",
"MAY FLOWER HIGH SCHOOL",
"MC KEJRIWAL VIDYAPEETH",
"MODERN ACADEMY BELUR",
"MP BIRLA FOUNDATION",
"NATIONAL ENGLISH SCHOOL RAJARHAT",
"NATIONAL ENGLISH SCHOOL VIP",
"NIVATIA CONVENT HIGH SCHOOL",
"NOPANY HIGH",
"RAJASTHAN VIDYA MANDIR",
"RUBY PARK PUBLIC SCHOOL",
"SALT LAKE SIKSHA NIKETAN",
"SHAW PUBLIC SCHOOL",
"SHREE BALKRISHNA VITHALNATH VIDYALAYA",
"SHREE BALKRISHNANA VITTHALNATH VIDYALYA",
"SHREE DIDOO MAHESWARI PANCHAYAT VIDYALAYA",
"SHREE DIGAMBAR JAIN VIDYALAYA",
"SHREE JAIN SWETAMBER TERAPANTHI VIDAYALAYA",
"SHREE JAIN VIDYALAYA",
"SHREE MAHESWARI VIDYALAYA",
"SHREE VISHUDDHANAND SARASWATI VIDYALAYA",
"SHRI SHIKSHYATAN SCHOOL",
"SHRI_BALKRISHNA_VITTHALNATH_BALIKA_VIDYALAYA",
"SNOW WHITE HIGH SCHOOL",
"SOUTH CITY INTERNATIONAL",
"SOUTH POINT HIGH SCHOOL",
"SRI SRI ACADEMY",
"ST MICHAELS ACADEMY",
"ST PAULS BOARDING & DAY SCHOOL",
"ST XAVIERS COLLEGIATE SCHOOL",
"ST. DENIS SCHOOL",
"ST. JOHNS DIOCESAN GIRLS",
"SUNRISE ENGLISH MEDIUM SCHOOL",
"SUSHILA BIRLA GIRLS SCHOOL",
"Shree Jain Vidyalaya (Girls)",
"Shree Jain Vidyalaya Boys",
"St.Josephs College",
"Sunrise Enlish Medium School",
"TANTIA HIGH SCHOOL",
"THE ARYANS SCHOOL",
"THE CALCUTTA ANGLO GUJRATI",
"THE NEWTOWN SCHOOL",
"THE NOBLE MISSION SCHOOL",
"WILLIAMS DAY SCHOOL",
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