import React, { useContext, useMemo, useState } from "react";
import "./SearchResult.css";

import { Combobox } from "@headlessui/react";
import { useNavigate, Link } from "react-router-dom";
import { MyContext } from "../../store";
import axios from "axios";

const schoolNames = [
  "ABHINAV  BHARTI SCHOOL",
];

const SearchResult = () => {
  const { studentData, setStudentData } = useContext(MyContext);

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [SchoolName, setSchoolName] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uniqueSchools = useMemo(
    () => [...new Set(schoolNames)],
    []
  );

  const filteredSchool =
    query === ""
      ? uniqueSchools
      : uniqueSchools.filter((schoolName) =>
          schoolName
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(
              query.toLowerCase().replace(/\s+/g, "")
            )
        );

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!SchoolName) {
      alert("Please select your school name.");
      return;
    }

    if (!PhoneNumber || PhoneNumber.length !== 10) {
      alert("Please enter a valid 10 digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://kwizdom2-0-backend.onrender.com/api/search",
        {
          SchoolName,
          PhoneNumber,
        }
      );

      setStudentData(data);

      if (data?._id) {
        navigate("/certificate");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kwizdom-page">

      <main className="kwizdom-main">

        <section className="kwizdom-content">

          {/* ================= LEFT ================= */}

          <div className="result-panel">

            <div className="event-banner">
              <img
                src="/toplogo.jpeg"
                alt="Kwizdom 2026"
              />
            </div>

            <div className="result-heading">

              <span>KWIZDOM 4.0</span>

              <h1>Check Your Result</h1>

              <p>
                Enter the required information to check your result.
              </p>

            </div>

            <form
              className="result-form"
              onSubmit={submitHandler}
            >

              {/* SCHOOL */}

              <div className="form-group">

                <label>School Name</label>

                <Combobox
                  value={SchoolName}
                  onChange={setSchoolName}
                >

                  <div className="combobox-wrapper">

                    <Combobox.Input
                      className="combo-input"
                      onChange={(event) =>
                        setQuery(event.target.value)
                      }
                      autoComplete="off"
                      placeholder="Search or select your school"
                    />

                    <Combobox.Options className="combo">

                      {filteredSchool.length > 0 ? (
                        filteredSchool.map((school, index) => (

                          <Combobox.Option
                            key={`${school}-${index}`}
                            value={school}
                            className="option"
                          >

                            {({ active }) => (
                              <div
                                className={
                                  active
                                    ? "option-active"
                                    : "option-normal"
                                }
                              >
                                {school}
                              </div>
                            )}

                          </Combobox.Option>

                        ))
                      ) : (

                        <div className="no-school">
                          School name not on list?
                          Results will be updated shortly.
                        </div>

                      )}

                    </Combobox.Options>

                  </div>

                </Combobox>

              </div>


              {/* MOBILE */}

              <div className="form-group">

                <label>Mobile Number</label>

                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength="10"
                  placeholder="Enter 10 digit mobile number"
                  value={PhoneNumber}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);

                    setPhoneNumber(value);
                  }}
                />

              </div>


              {/* NOTE */}

              <div className="result-note">
                * Please note that if the student has not filled the
                OMR sheet properly, the results will not be published.
              </div>


              {/* ERROR */}

              {studentData?.message && (
                <div className="result-error">
                  No data found. Please check your details.
                </div>
              )}


              {/* BUTTON */}

              <button
                type="submit"
                className="result-button"
                disabled={loading}
              >
                {loading
                  ? "Checking..."
                  : "Get Your Result"}
              </button>


              {/* FORGOT */}

              <Link
                to="/forgot"
                className="cannot-find"
              >
                Can't find your name?
              </Link>

            </form>

          </div>


          {/* ================= RIGHT ================= */}

          <div className="visual-panel">

            <div className="visual-content">

              <div className="visual-badge">
                KWIZDOM 4.0
              </div>

              <h2>
                Think.
                <br />
                Discover.
                <br />
                Win.
              </h2>

              <p>
                The ultimate quiz competition
              </p>

              <img
                src="/hero.png"
                alt="Kwizdom"
                className="hero-character"
              />

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="kwizdom-footer">

        <div className="footer-top">

          <div className="footer-social">

            <span className="follow-text">
              Follow Us
            </span>

            <a
              href="https://www.facebook.com/taazabengal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook"></i>
            </a>

            <a
              href="https://x.com/taazatv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter-x"></i>
            </a>

            <a
              href="https://www.instagram.com/taazatvchannel/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>

            <a
              href="https://www.youtube.com/@taazatv1632"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-youtube"></i>
            </a>

          </div>


          <div className="footer-brand">

            <strong>Taaza TV</strong>

            <span>
              To watch Taaza TV live, download the mobile app
            </span>

          </div>


          <div className="app-links">

            <img
              src="/googleplay.webp"
              alt="Google Play"
            />

            <img
              src="/appstore.png"
              alt="App Store"
            />

          </div>

        </div>


        <div className="footer-bottom">
          Taaza TV is available on Hathway (214), GTPL (213),
          JIO TV / Daily Hunt.
        </div>

      </footer>

    </div>
  );
};

export default SearchResult;