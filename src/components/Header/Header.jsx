import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const tickerItems = [
    "TAAZA TV PRESENTS KWIZDOM 4.0 THE ULTIMATE QUIZ COMPETITION, RESULTS PUBLISHED FOR: ",
"ABHINAV BHARATI SCHOOL",
"Aditya Academy Barasat",
"AG MEMORIAL HIGH SCHOOL",
"AGRASAIN BALIKA SIKSHA SADAN",
"ALIPORE TAKSHAL VIDYAPEETH",
"APEEJAY SCHOOL",
"APEEJAY SCHOOL PARK STREET",
"ASHOK HALL GIRLS HIGH SCHOOL",
"AUTHPUR NATIONAL MODEL SCHOOL",
"BALIKA SIKSHA SADAN",
"BDM INTERNATIONAL",
"BIRLA HIGH SCHOOL",
"CALCUTTA BOYS SCHOOL",
"Calcutta Public School(BAGUIHATI)",
"CALCUTTA PUBLIC SCHOOL(BIDHAN PARK)",
"Central Modern School BARANAGAR",
"DIPTI BRIDGE WELL SCHOOL",
"Don Bosco Park Circus",
"DPS NEWTOWN",
"DPS RUBY PARK",
"EVERGREEN HIGH SCHOOL",
"FRANK ANTHONY PUBLIC SCHOOL",
"GARULIA MILL HIGH SCHOOL",
"GD Birla Center For Education",
"GYAN BHARATI VIDYALAYA (ENGLISH MEDIUM)",
"GYAN BHARATI VIDYAPITH",
"GYAN BHARTI BALIKA VIDYALAYA",
"H C K JAIN VIDYALAYA",
"Hariyana Vidya Mandir",
"Heritage Academy High School",
"HOWRAH MODERN SCHOOL",
"I P MEMORIAL SCHOOL",
"IEM PUBLIC SCHOOL",
"INDUS VALLEY WORLD SCHOOL",
"JAGADTAL ANGLO INDIA HIGH SCHOOL",
"JAGAT DAL KAMALA HIGH SCHOOL",
"JAGATDAL LALITA DEVI BALIKA VIDYALAYA",
"Jagatdal Shams Urdu School",
"JAGATDAL SHRI HARI UCHCHA VIDYALAYA",
"K H G HIGH SCHOOL",
"KANKINARA URDU GIRLS HIGH SCHOOL",
"KHANNA HIGH SCHOOL",
"LA MARTINIERE FOR BOYS",
"LA MARTINIERE FOR GIRLS",
"LABONYA PUBLIC SCHOOL",
"LAJPAT HINDI HIGH SCHOOL",
"MAHAVIR INSTITUE OF EDUCATION",
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
"Shree Jain Vidyalaya (Girls)",
"Shree Jain Vidyalaya Boys",
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
"ST TERESAS SECONDARY SCHOOL",
"ST XAVIERS COLLEGIATE SCHOOL",
"ST. DENIS SCHOOL",
"ST. JOHNS DIOCESAN GIRLS",
"St.Josephs College",
"STARLING INTERNATIONAL SCHOOL",
"SUNRISE ENGLISH MEDIUM SCHOOL",
"Sunrise Enlish Medium School",
"SUSHILA BIRLA GIRLS SCHOOL",
"TANTIA HIGH SCHOOL",
"THE ARYANS SCHOOL",
"THE ASSEMBLY OF GOD CHURCH",
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