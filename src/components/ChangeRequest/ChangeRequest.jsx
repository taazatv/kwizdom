import React, { useState } from "react";
import "./ChangeRequest.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Combobox } from "@headlessui/react";

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
  "Aditya Academy",
  "Agrasain Balika Siksha Sadan",
  "Alipore Takshal Vdiyapeeth",
  "Balika Siksha Sadan",
  "Dipti Bridgewell School",
  "GD Birla",
  "La Martiniere for Girls",
  "National English School VIP",
  "Shaw Public School",
  "St. Pauls Boarding Day School",
  "The Abacus Central School",
  "Shree Jain Shwetamber Vidyalaya",
  "Abhinav Bharti High School",
  "Birla High School",
  "Calcutta Public School Bidhan Park",
  "Khanna High School",
  "La Martiniere for Boys",
  "Modern Academy Belur",
  "Shree Shikshayatan School",
  "Sri Sri Academy",
  "St. Josephs College",
  "Don Bosco Liluah",
];

const ChangeRequest = () => {
  const { id } = useParams();

  const [newData, setNewData] = useState({});

  const [message, setMessage] = useState("");
  const [requestedName, setRequestedName] = useState("");
  const [requestedSchoolName, setRequestedSchoolName] = useState("");
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

  console.log(newData);
  console.log(requestedSchoolName);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("Request has been sent...");

    // Clear the message after 3 seconds (3000 milliseconds)
    const { data } = await axios.put(
      `https://kwizdom2-0-backend.onrender.com/api/${id}/new`,
      { requestedName, requestedSchoolName }
    );
    setNewData(data);
    setTimeout(() => {
      setMessage("");
    }, 3000);

    setMessage("");
    setRequestedName("");
    setRequestedSchoolName("");
  };
  return (
    <main className="request_box">
      <div className="request">
        <div>
          <img src="/toplogo.jpg" alt="" />
        </div>

        <form>
          <h1>Edit</h1>
          <div>
            <label>Student Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={requestedName}
              onChange={(e) => setRequestedName(e.target.value)}
            />
          </div>

          <div>
            <label>School Name</label>
            <Combobox
              value={requestedSchoolName}
              onChange={setRequestedSchoolName}
            >
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                className="combo-input"
                autoComplete="off"
                placeholder="School Names"
              />

              <Combobox.Options className="combo2">
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
                    No SchoolName present
                  </div>
                )}
              </Combobox.Options>
            </Combobox>
          </div>

          <button onClick={submitHandler}>Send Request</button>

          {message && <p className="success">{message}</p>}
        </form>
      </div>

      <div>
        <img src="/edit.png" alt="" />
      </div>

      <div className="social-visible">
        <div className="social-links-cg">
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
        </div>
      </div>
    </main>
  );
};

export default ChangeRequest;
