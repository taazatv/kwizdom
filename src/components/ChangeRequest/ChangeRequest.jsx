import React, { useState } from "react";
import "./ChangeRequest.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Combobox } from "@headlessui/react";

const schoolNames = [
  "Abhinav Bharti High School",
];

const ChangeRequest = () => {
  const { id } = useParams();

  const [requestedName, setRequestedName] = useState("");
  const [requestedSchoolName, setRequestedSchoolName] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredSchool =
    query === ""
      ? schoolNames
      : schoolNames.filter((schoolName) =>
          schoolName
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(
              query.toLowerCase().replace(/\s+/g, "")
            )
        );

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!requestedName || !requestedSchoolName) {
      setMessage("Please fill in all the fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.put(
        `https://kwizdom2-0-backend.onrender.com/api/${id}/new`,
        {
          requestedName,
          requestedSchoolName,
        }
      );

      setMessage("Correction request sent successfully.");

      setRequestedName("");
      setRequestedSchoolName("");
      setQuery("");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Request error:", error);
      setMessage("Unable to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="request-page">

      <section className="request-container">

        {/* LEFT SIDE */}

        <div className="request-left">

          <div className="request-heading">
            <span>KWIZDOM 4.0</span>

            <h1>Correction Request</h1>

            <p>
              Need to correct your name or school name?
              Submit the correct details below.
            </p>
          </div>


          {/* EVENT IMAGE */}

          <div className="request-banner">
            <img
              src="/toplogo.jpeg"
              alt="Kwizdom 4.0"
            />
          </div>


          {/* FORM */}

          <div className="request-card">

            <div className="card-heading">
              <h2>Edit Details</h2>

              <p>
                Enter the information exactly as it should
                appear on your result.
              </p>
            </div>

            <form onSubmit={submitHandler}>

              {/* STUDENT NAME */}

              <div className="form-group">

                <label htmlFor="studentName">
                  Student Name
                </label>

                <input
                  id="studentName"
                  type="text"
                  placeholder="Enter your correct name"
                  value={requestedName}
                  onChange={(e) =>
                    setRequestedName(e.target.value)
                  }
                />

              </div>


              {/* SCHOOL NAME */}

              <div className="form-group">

                <label>
                  School Name
                </label>

                <Combobox
                  value={requestedSchoolName}
                  onChange={setRequestedSchoolName}
                >

                  <div className="school-wrapper">

                    <Combobox.Input
                      className="school-input"
                      autoComplete="off"
                      placeholder="Search or select your school"
                      onChange={(e) =>
                        setQuery(e.target.value)
                      }
                    />

                    <Combobox.Options className="school-options">

                      {filteredSchool.length > 0 ? (
                        filteredSchool.map((school) => (

                          <Combobox.Option
                            key={school}
                            value={school}
                            className="school-option"
                          >
                            {({ active }) => (
                              <div
                                className={
                                  active
                                    ? "school-option-active"
                                    : ""
                                }
                              >
                                {school}
                              </div>
                            )}
                          </Combobox.Option>

                        ))
                      ) : (
                        <div className="no-school">
                          No school found
                        </div>
                      )}

                    </Combobox.Options>

                  </div>

                </Combobox>

              </div>


              {/* NOTE */}

              <div className="request-note">
                <span>i</span>

                <p>
                  Please make sure the information entered
                  above is accurate before submitting.
                </p>
              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send Correction Request"}
              </button>


              {/* MESSAGE */}

              {message && (
                <div className="request-message">
                  {message}
                </div>
              )}

            </form>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="request-visual">

          <div className="visual-content">

            <span>STUDENT SUPPORT</span>

            <h2>
              Keep your
              <br />
              details
              <strong> accurate.</strong>
            </h2>

            <p>
              Make sure your student information is correct
              so your result and certificate carry the right
              details.
            </p>

            <div className="visual-list">

              <div>
                <b>01</b>
                <span>Enter your correct name</span>
              </div>

              <div>
                <b>02</b>
                <span>Select your school</span>
              </div>

              <div>
                <b>03</b>
                <span>Submit your request</span>
              </div>

            </div>

          </div>

          <img
            src="/edit.png"
            alt="Student correction"
            className="edit-image"
          />

        </div>

      </section>

    </main>
  );
};

export default ChangeRequest;