import React, { useState } from "react";
import "./ChangeRequest.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Combobox } from "@headlessui/react";

const schoolNames = [
  "Abhinav Bharti High School",
  "Adamas International School",
  "ADAMAS WORLD SCHOOL",
  "Aditya Academy",
  "Agrasain Balika Siksha Sadan",
  "Alipore Takshal Vdiyapeeth",
  "Anglo India High School",
  "APEEJAY SCHOOL PARK STREET",
"ASIAN INTERNATIONAL SCHOOL",
"Balika Siksha Sadan",
"BDM International School",
"Bhavans Gangabux Kanoria Vidyamandir",
"Birla High School",
"Calcutta Anglo Gujrati School",
"Calcutta Boys School"
"Calcutta Public School Baguihati",
"Calcutta Public School Bidhan Park",
"Central Modern School",
"Dipti Bridgewell School",
"Don Bosco Liluah",
"Don Bosco Park Circus",
"DPS Howrah",
"DPS RUBY PARK",
"Evergreen High School",
"Frank Anthony Public School",
"Garulia Mill High School",
"Garulia Muncipal Girls High School",
"Garulia Shree Gaurishankar Jute Mills Hindu Vidyalaya",
"GD Birla",
"Grace Ling Liang English School",
"GYAN BHARTI BALIKA VIDYALAYA",
"GYAN BHARTI ENGLISH MEDIUM SCHOOL",
"GYAN BHARTI VIDYAPEETH",
"Harakh Chand Kankariya Jain Vidyalaya (Jagatdal)",
"Hariyana Vidya Mandir",
"Howrah Modern School",
"IP Memorial School",
"Jibreel International School",
"Kamla High School",
"Kankinara Arya Vidyalaya",
"Kankinara High School",
"Kankinara Urdu Girls High School",
"KHALSA ENGLISH HIGH SCHOOL",
"Khalsa Model SS",
"Khanna High School",
"La Martiniere for Boys",
"La Martiniere for Girls",
"Lajpat Balika Vidyalaya",
"Lajpat Hindi High school",
"Lalita Devi Balika Vidyalaya",
"Ling Liang High school",
"Loreto Day School Dharamtala",
"Mahavir Institute of Education and Research"
"Maheshwari Girls school",
"Marwari Balika Vidyalaya",
"May Flower English School",
"MC Kejriwal Vidyapeeth",
"Modern Academy Belur",
"Mp Birla F.H.S School",
"National English School",
"National English School VIP",
"NOPANY HIGH SCHOOL",
"SALT LAKE POINT SCHOOL",
"Saltlake Shikshaniketan",
"Scottish Church School",
"Seth Soorajmal Jalan Balika Vidyalaya",
"Sham Golden Academy",
"Shams Urdu High School",
"Shaw Public School",
"SHREE BALIKRISHNA VITHALNATH BALIKA VIDYALAYA",
"SHREE BALKRISHNA VITHALNATH VIDYALAYA",
"Shree Didoo Maheshwari Panchayat Vidyalaya",
"Shree Digamber Jain Vidyalaya",
"Shree Jain Howrah",
"Shree Jain Vidyalaya",
"SHREE MAHESHWARI VIDYALAYA",
"Shree Shikshayatan School",
"Shree Vishuddhanand Saraswati Vidyalaya",
"South Point High School",
"Sree Jain Swetamber Terapanthi Vidyalaya",
"Sri Hari Uchha Vidyalya",
"Sri Sri Academy",
"St. Andrews Public School MG Road",
"St. Augustine Day School",
"St. Denis School",
"St. Josephs College",
"St. Micheal Academy",
"St. Pauls Boarding Day School",
"ST. XAVIERS COLLEGIATE SCHOOL",
"Starling International School",
"Sunrise English Medium School",
"Tantia High School",
"The Abacus Central School",
"THE HERITAGE SCHOOL",
"The Newtwon School",
"Labonya Public School"
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
