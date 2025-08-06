import React, { useContext, useState } from "react";
import "./SearchResult.css";

import { Combobox } from "@headlessui/react";
import { useNavigate, Link } from "react-router-dom";
import { MyContext } from "../../store";
import axios from "axios";

const schoolNames = [
  "APEEJAY SCHOOL PARK STREET",
  "KHALSA ENGLISH HIGH SCHOOL",
  "ADAMAS WORLD SCHOOL",
  "ASIAN INTERNATIONAL SCHOOL",
  "SALT LAKE POINT SCHOOL",
  "ST. XAVIERS COLLEGIATE SCHOOL",
  "GYAN BHARTI BALIKA VIDYALAYA",
  "GYAN BHARTI ENGLISH MEDIUM SCHOOL",
  "GYAN BHARTI VIDYAPEETH",
  "NOPANY HIGH SCHOOL",
  "SHREE BALKRISHNA VITHALNATH VIDYALAY",
  "SHREE BALIKRISHNA VITHALNATH BALIKA VIDYALAYA",
  "SHREE MAHESHWARI VIDYALAYA",
  "THE HERITAGE SCHOOL",
  "Don Bosco Park Circus",
  "DPS Howrah",
  "DPS RUBY PARK",
  "Shree Jain Howrah",
  "St. Andrews Public School MG Road",
  "Bhavans Gangabux Kanoria Vidyamandir",
  "Calcutta Anglo Gujrati School",
  "IP Memorial School",
  "Jalan Balika Vidyalaya",
  "Jibreel International School",
  "Marwari Balika Vidyalaya",
  "Mp Birla F.H.S School",
  "National English School",
  "Scottish Church School",
  "Scottish Church School",
  "Shree Didoo Maheshwari",
  "Shree Jain Digamber",
  "Shree Jain Shwetamber Vidyalaya",
  "The Newtwon School",
];

const SearchResult = () => {
  const { studentData, setStudentData } = useContext(MyContext);

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [SchoolName, setSchoolName] = useState("");
  const [query, setQuery] = useState("");

  const filteredSchool =
    query === ""
      ? schoolNames
      : schoolNames.filter((schoolName) => {
          return schoolName
            .toLocaleLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLocaleLowerCase().replace(/\s+/g, ""));
        });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://kwizdom2-0-backend.onrender.com/api/search",
        {
          SchoolName,
          PhoneNumber,
        }
      );
      setStudentData(data);
      if (data._id != undefined) navigate("/certificate");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="search-result-container">
        <marquee className="ticker">
          <span> PUBLISHED RESULT OF SCHOOL </span>
          {schoolNames.map((schoolName) => (
            <span key={schoolName}> • {schoolName}</span>
          ))}
        </marquee>
        <div className="search-result">
          <div className="left">
            <div className="hero-logo">
              <img src="/toplogo.jpg" alt="toplogo" />
            </div>

            <p>Enter all the necessary info and Get your result.</p>

            <form className="form">
              <Combobox value={SchoolName} onChange={setSchoolName}>
                <Combobox.Input
                  onChange={(event) => setQuery(event.target.value)}
                  className="combo-input"
                  autoComplete="off"
                  placeholder="School Names"
                />
                <Combobox.Options className="combo">
                  {filteredSchool.length > 0 ? (
                    filteredSchool.map((school) => (
                      <Combobox.Option
                        key={school}
                        value={school}
                        className="option"
                      >
                        {({ active }) => (
                          <div className={`${active ? "bg-green" : "bg-gray"}`}>
                            {school}
                          </div>
                        )}
                      </Combobox.Option>
                    ))
                  ) : (
                    <div style={{ fontSize: "var(--tertiary-font)" }}>
                      School name not on list? Results will be updated shortly
                    </div>
                  )}
                </Combobox.Options>
              </Combobox>

              <input
                type="number"
                placeholder="Mobile Number"
                value={PhoneNumber}
                onChange={(e) =>
                  setPhoneNumber(
                    Number(e.target.value.toString().substring(0, 10)) || ""
                  )
                }
              />

              <div style={{ fontWeight: "bold", fontStyle: "italic" }}>
                *Please note that if the student has not filled the OMR sheet
                properly, the results will not be published.
              </div>

              <p style={{ color: "red", textAlign: "left", width: "100%" }}>
                {studentData.message && "*No Data Found *"}
              </p>
              <button onClick={submitHandler}>Get your Result</button>

              <Link
                to="/forgot"
                style={{ color: "black", textDecoration: "none" }}
                className="redbutton"
              >
                <p>Can't find your name ?</p>
              </Link>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/herologo2.png"
                  alt="sponsor"
                  style={{
                    width: "12rem",
                    height: "auto",
                    marginTop: "20px",
                  }}
                />
              </div>
            </form>
          </div>

          <div className="right">
            <div className="hero-img">
              <img src="/hero.png" alt="" />
            </div>
          </div>

          <div className="lower-div">
            <div className="inner-lower-div">
              <p>Platinum Sponsors</p>
              <div>
                <div>
                  <img src="/herologo3.png" alt="" />
                </div>
                <div>
                  <img src="/herologo4.png" alt="" />
                </div>
                <div>
                  <img src="/herologo5.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="bar-line" />
      <div className="bar-line-2">
        <div className="inner-bar">
          <div>
            <p>Follow Us on</p>
            <span>
              <a
                className="link"
                href="https://www.facebook.com/taazabengal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>
            </span>
            <span>
              <a
                className="link"
                href="https://x.com/taazatv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
            </span>
            <span>
              <a
                className="link"
                href="https://www.instagram.com/taazatvchannel/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </span>
            <span>
              <a
                className="link"
                href="https://www.youtube.com/@taazatv1632"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-youtube"></i>
              </a>
            </span>
            <p>Taaza Tv</p>
            <p>To Watch Taaza Tv live download the mobile App</p>
          </div>

          <div>
            <div>
              <img src="/googleplay.webp" alt="Google Play" />
            </div>
            <div>
              <img src="/appstore.png" alt="App Store" />
            </div>
          </div>
        </div>
      </div>
      <div className="bar-line-3">
        <p>
          Taaza TV is available on Hathway (214), GTPL (213) also on JIO TV /
          Daily Hunt.
        </p>
      </div>
    </>
  );
};

export default SearchResult;
