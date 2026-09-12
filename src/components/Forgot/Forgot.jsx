import React, { useContext, useState, useEffect } from "react";
import "./Forgot.css";
import axios from "axios";
import { MyContext } from "../../store";
import { useNavigate } from "react-router-dom";
import { Combobox } from "@headlessui/react";

const schoolNames = [
  "KWIZDOM 4.0",
  "KWIZDOM 4.0",
  "KWIZDOM 4.0",
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
