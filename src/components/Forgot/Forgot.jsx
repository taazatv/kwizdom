import React, { useContext, useState } from "react";
import "./Forgot.css";
import axios from 'axios'
import { MyContext } from "../../store";
import { useNavigate } from "react-router-dom";
import { Combobox } from "@headlessui/react";


const schoolNames = [
  "ASIAN INTERNATIONAL SCHOOL",
  "ABHINAV  BHARTI"
];

const Forgot = () => {
  const { studentData,setStudentData } = useContext(MyContext);
  console.log(studentData)

  const [newDOB, setNewDOB] = useState("")
  const [StudentName, setStudentName] = useState("")
  const [SchoolName, setSchoolName] = useState("")

  const [query, setQuery] = useState("");

  const convertDateFormat = (date) => {
    const dateParts = date.split('-'); // Splitting the date string by dashes
    const year = dateParts[0]; // Extracting the last two digits of the year
    const month = dateParts[1];
    const day = dateParts[2];
    return `${day}-${month}-${year}`;
  };



  const DOB = convertDateFormat(newDOB)

  const navigate = useNavigate()

  const SearchHandler = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("https://kwizdom2-0-backend.onrender.com/api/forgot/new", {
        StudentName,
        DOB
      });
      setStudentData(data);

      navigate("/certificate");
    } catch (error) {}
  };


  const filteredSchool =
    query === ""
      ? schoolNames
      : schoolNames.filter((schoolName) => {
          return schoolName
            .toLocaleLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLocaleLowerCase().replace(/\s+/g, ""));
        });


  return (
    <main className="forgot-box">
      <div className="forgot">
        <div>
          <img src="/herologo.png" alt="" />
        </div>

        <form>
          <h1>Enter all the necessary info and Get your result.</h1>


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
                      No SchoolName present
                    </div>
                  )}
                </Combobox.Options>
              </Combobox>



          <div>
            <label>Student Name</label>
            <input 
            type="text" 
            placeholder="Enter Your Name" 
            value={StudentName}
            onChange={(e) => setStudentName(e.target.value)}
            />
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              placeholder="Date of Birth"
              value={newDOB}
              onChange={(e) => setNewDOB(e.target.value)}
            />
          </div>

          <button onClick={SearchHandler}>Search</button>
        </form>
      </div>

      <div>
        <img src="/forgot.png" alt="" />
      </div>

      <div className="social-visible">
        <div className="social-links-fg">
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

export default Forgot;
