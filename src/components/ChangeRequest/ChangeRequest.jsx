import React, { useState } from 'react'
import "./ChangeRequest.css"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Combobox } from "@headlessui/react";

const schoolNames = [
  "ASIAN INTERNATIONAL SCHOOL",
  "ABHINAV  BHARTI"
];

const ChangeRequest = () => {
  
  const {id} = useParams()

  const [newData,setNewData] = useState({})

  const [message,setMessage] = useState("")
  const [requestedName,setRequestedName] = useState("")
  const [requestedSchoolName,setRequestedSchoolName] = useState("")
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

  console.log(newData)
  console.log(requestedSchoolName)

  const submitHandler = async(e) => {
    e.preventDefault()
    setMessage("Request has been sent...")

    // Clear the message after 3 seconds (3000 milliseconds)
    const {data} = await axios.put(`https://kwizdom2-0-backend.onrender.com/api/${id}/new`,{requestedName,requestedSchoolName})
    setNewData(data)
    setTimeout(() => {
        setMessage('');
      }, 3000);

    setMessage("")
    setRequestedName("")
    setRequestedSchoolName("")
  }
   return (
    <main className="request_box">
      <div className="request">
        <div><img src="/herologo.png" alt="" /></div>

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
          <Combobox value={requestedSchoolName} onChange={setRequestedSchoolName}>
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

        {message && <p className='success'>{message}</p>}
      </form>
      </div>

      <div>
        <img src="/edit.png" alt="" />
      </div>

      <div className='social-visible'>
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
}

export default ChangeRequest
