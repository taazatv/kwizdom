import React, { useContext, useState } from "react";
import "./Forgot.css";
import axios from 'axios'
import { MyContext } from "../../store";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const { studentData,setStudentData } = useContext(MyContext);
  console.log(studentData)

  const [newDOB, setNewDOB] = useState("")
  const [StudentName, setStudentName] = useState("")

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
      const { data } = await axios.post("http://localhost:8000/api/forgot/new", {
        StudentName,
        DOB
      });
      setStudentData(data);

      navigate("/certificate");
    } catch (error) {}
  };

  return (
    <main className="forgot-box">
      <div className="forgot">
        <div>
          <img src="/logo1.png" alt="" />
        </div>

        <form>
          <h1>Search</h1>

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
