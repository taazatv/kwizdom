import React, { useContext, useState, useEffect } from "react";
import "./Forgot.css";
import axios from "axios";
import { MyContext } from "../../store";
import { useNavigate } from "react-router-dom";
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
  "Anglo India High School",
  "BDM International School",
  "Calcutta Boys School",
  "Central model School",
  "Frank Anthony Public School",
  "Garulia Mill High School",
  "Garulia Muncipal Girls High School",
  "Garulia Shree Gaurishankar Jute Mills Hindu Vidyalaya",
  "Harakh Chand Kankariya Jain Vidyalaya (Jagatdal)",
  "Hariyana Vidya Mandir",
  "Kamla High School",
  "Kankinara Arya Vidyalaya",
  "Kankinara Urdu Girls High School",
  "Lalita Devi Balika Vidyalaya",
  "Ling Liang High school",
  "M C K V",
  "Mahavir Institute",
  "Maheshwari Girls school",
  "Saltlake Shikshaniketan",
  "Shree Vishuddhanand Vidyalaya",
  "South Point High School",
  "Sri Hari Uchha Vidyalya",
  "St. Augustine Day School",
  "Starling International",
  "Sunrise English Medium",
  "Tantia High School",
  "Adamas International School",
  "Calcutta Public School Baguihati",
  "Evergreen High School",
  "Grace Ling Liang English School",
  "Khalsa Model SS",
  "Lajpat Balika Vidyalaya",
  "Loreto Day School Dharamtala",
  "May Flower English School",
  "Shams Urdu High School",
  "Shree Jain Vidyalaya",
  "St. Denis School",
  "St. Micheal Academy",
];

const Forgot = () => {
  const { studentData, setStudentData } = useContext(MyContext);
  const [newDOB, setNewDOB] = useState("");
  const [StudentName, setStudentName] = useState("");
  const [SchoolName, setSchoolName] = useState("");

  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const navigate = useNavigate();

  const convertDateFormat = (date) => {
    const dateParts = date.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${day}-${month}-${year}`;
  };

  const DOB = newDOB ? convertDateFormat(newDOB) : "";

  // Fetch all students on component mount
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get(
          "https://kwizdom2-0-backend.onrender.com/api/getAllStudents"
        );
        setAllStudents(res.data); // Ensure valid data assignment
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    getStudents();
  }, []);

  const SearchHandler = async (e) => {
    e.preventDefault();
    if (StudentName && SchoolName && DOB) {
      try {
        const { data } = await axios.post(
          "https://kwizdom2-0-backend.onrender.com/api/forgot/new",
          { StudentName, DOB, SchoolName }
        );
        console.log(data);
        setStudentData(data);
        navigate("/certificate");
      } catch (error) {
        console.error("Error during search:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Filter school names based on the query
  const filteredSchool =
    query === ""
      ? schoolNames
      : schoolNames.filter((schoolName) =>
          schoolName
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  // Filter students based on the selected school and query
  const filteredStudent =
    query2 === ""
      ? allStudents.filter((student) => student.SchoolName === SchoolName)
      : allStudents
          .filter((student) => student.SchoolName === SchoolName)
          .filter((student) =>
            student.StudentName.toLowerCase().includes(query2.toLowerCase())
          );

  return (
    <main className="forgot-box">
      <div className="forgot">
        <div>
          <img src="/toplogo.jpg" alt="Hero" />
        </div>
        <form>
          <h1>Enter all the necessary info and Get your result.</h1>

          {/* School Name Combobox */}
          <Combobox value={SchoolName} onChange={setSchoolName}>
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
                    {({ active }) => (
                      <div className={`${active ? "bg-green" : "bg-gray"}`}>
                        {school}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <div style={{ fontSize: "var(--tertiary-font)" }}>
                  No School Name Present
                </div>
              )}
            </Combobox.Options>
          </Combobox>

          {/* Student Name Combobox */}
          <Combobox value={StudentName} onChange={setStudentName}>
            <Combobox.Input
              onChange={(event) => setQuery2(event.target.value)} // Corrected the state update function
              className="combo-input"
              autoComplete="off"
              placeholder="Student Names"
            />
            <Combobox.Options className="combo">
              {filteredStudent.length > 0 ? (
                filteredStudent.slice(0, 8).map((student) => (
                  <Combobox.Option
                    key={student._id}
                    value={student.StudentName}
                    className="option"
                  >
                    {({ active }) => (
                      <div className={`${active ? "bg-green" : "bg-gray"}`}>
                        {student.StudentName}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <div style={{ fontSize: "var(--tertiary-font)" }}>
                  No Student Name Present
                </div>
              )}
            </Combobox.Options>
          </Combobox>

          {/* Date of Birth Input */}
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              placeholder="Date of Birth"
              value={newDOB}
              onChange={(e) => setNewDOB(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button onClick={SearchHandler}>Search</button>
        </form>
      </div>

      <div>
        <img src="/forgot.png" alt="Forgot" />
      </div>

      <div className="social-visible">
        <div className="social-links-fg">
          <div>
            <img src="/wa.png" alt="WhatsApp" />
          </div>
          <div>
            <img src="/insta.png" alt="Instagram" />
          </div>
          <div>
            <img src="/fb.png" alt="Facebook" />
          </div>
          <div>
            <img src="/yt.png" alt="YouTube" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Forgot;
