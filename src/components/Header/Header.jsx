


import React from "react";
import "./Header.css";


import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <main className="head-container">
        <div className="header">
          <Link to="/search" style={{textDecoration:"none",color:"var(--color-white)"}}><h1>KWiZDoM</h1></Link>

          <div>
            <p><a href="/">Home</a></p>
            <p><Link to="/about">{window.innerWidth>500?"About Kwizdom":"About"}</Link></p>
               


            {/* <p>About GRSE</p>  */}
            <p><a href="https://taazatv.com/contact.php"> Contact Us</a></p>

            {/* <div>
              <i class="bi bi-list"></i>
            </div> */}

            {/* <div>
            <i class="bi bi-search"></i>
            </div> */}
          </div>
        </div>

        {/* Mobile Menu */}

        {/* <div className="mobile-header">
          <div>
         
          </div>
        </div> */}
      </main>
    </>
  );
};

export default Header;
