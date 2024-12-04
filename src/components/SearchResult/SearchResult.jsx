import React, { useContext, useState } from "react";
import "./SearchResult.css";

import { Combobox } from "@headlessui/react";
import { useNavigate,Link } from "react-router-dom";
import { MyContext } from "../../store";
import axios from "axios"

const schoolNames = [
  "ASIAN INTERNATIONAL SCHOOL",
  "ABHINAV  BHARTI"
];

const SearchResult = () => {

  const { studentData, setStudentData } = useContext(MyContext);
  console.log(studentData);

  const [PhoneNumber,setPhoneNumber] = useState("")
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

  const navigate = useNavigate()
  
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("https://kwizdom2-0-backend.onrender.com/api/search", {
        SchoolName,
        PhoneNumber,
      });
      setStudentData(data);
      if(data._id != undefined)
      navigate("/certificate");
    } catch (error) {console.log(error)}
  };


  
  return (
    <>
      <main className="search-result-container">
        <div className="search-result">
          <div className="left">
            <div className="hero-logo">
              <img src="/herologo.png" alt="" />
            </div>

            <p>Enter all the necessary info and Get your result.</p>

            <form className="form">
              {/* <input type="text" placeholder="School Name" /> */}

              <Combobox  value={SchoolName} onChange={setSchoolName}>
                <Combobox.Input
                  onChange={(event) => setQuery(event.target.value)}
                  className="combo-input"
                  autoComplete="off"
                  placeholder="School Names"
                />

                <Combobox.Options className="combo">
                  {filteredSchool.length > 0 ? (
                    filteredSchool.slice(0, 8).map((school) => (
                      <Combobox.Option
                        key={school}
                        value={school}
                        className="option"
                      >
                        {({ active, selected }) => (
                          <div className={`${active ? "bg-green" : "bg-gray"}`}>
                            {school}
                          </div>
                        )}
                      </Combobox.Option>
                    ))
                  ) : (
                    <div style={{ fontSize: "var(--tertiary-font)" }}>
                      No School Name present
                    </div>
                  )}
                </Combobox.Options>
              </Combobox>

              <input 
              type="number" 
              placeholder="Mobile Number" 
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(Number(e.target.value.toString().substring(0,10) )|| "" )}
              />

              <p style={{color:"red",textAlign:"left",width:"100%" }}>{studentData.message && "*No Data Found *"}</p>
              <button onClick={submitHandler}>Get your Result</button>

              <Link
                to="/forgot"
                style={{ color: "black", textDecoration: "none" }}
                className="redbutton"
              >
                <p>Cant find your name ?</p>
              </Link>

              <div>
                <img src="/herologo2.png" alt="" style={{width: "12rem", height: "auto", transform: "translateX(-20px)", position: "absolute",
    top: "72px", left: "20%"}}/>

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

          {/* <div className="social-links">
            <div>
              <img src="/wa.png" alt="" />
            </div>
            <div>
              <img src="/insta.png" alt="" />
            </div>
            <div>
              <img src="/fb.png" alt="" />
            </div>
            <div>
              <img src="/yt.png" alt="" />
            </div>
          </div> */}
        </div>
      </main>
      <div className="bar-line" />
      <div className="bar-line-2">
        <div className="inner-bar">
          <div>
            <p>Follow Us on</p>
            <span>
            <i class="bi bi-facebook"></i>
            </span>
            <span>
            <i class="bi bi-twitter-x"></i>
            </span>
            <span>
            <i class="bi bi-instagram"></i>
            </span>
            <span>
            <i class="bi bi-youtube"></i>
            </span>
            <p>Taaza Tv</p>
            <p>To Watch Taaza Tv live download the mobile App</p>
          </div>

          <div>
            <div>
              <img src="/googleplay.webp" alt="" />
            </div>
            <div>
              <img src="/appstore.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="bar-line-3">
        <p>
          Taaza TV is available on Siti Cable (171), Hathway (214), GTPL (213)
          also on JIO TV / Daily Hunt.
        </p>
      </div>
    </>
  );
};

export default SearchResult;
