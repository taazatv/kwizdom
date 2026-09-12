import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Forgot.css";
import axios from "axios";
import { MyContext } from "../../store";
import { useNavigate } from "react-router-dom";
import { Combobox } from "@headlessui/react";

const schoolNames = [
  "Abhinav Bharti High School",
];

const Forgot = () => {
  const { setStudentData } = useContext(MyContext);

  const [newDOB, setNewDOB] = useState("");
  const [StudentName, setStudentName] = useState("");
  const [SchoolName, setSchoolName] = useState("");

  const [schoolQuery, setSchoolQuery] = useState("");
  const [studentQuery, setStudentQuery] = useState("");

  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* =========================================
     FETCH STUDENTS
  ========================================= */

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.get(
          "https://kwizdom2-0-backend.onrender.com/api/getAllStudents"
        );

        setAllStudents(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    getStudents();
  }, []);


  /* =========================================
     UNIQUE SCHOOL LIST
  ========================================= */

  const uniqueSchools = useMemo(() => {
    return [...new Set(schoolNames)];
  }, []);


  /* =========================================
     FILTER SCHOOLS
  ========================================= */

  const filteredSchools = useMemo(() => {
    const search = schoolQuery
      .toLowerCase()
      .replace(/\s+/g, "");

    if (!search) {
      return uniqueSchools;
    }

    return uniqueSchools.filter((school) =>
      school
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(search)
    );
  }, [schoolQuery, uniqueSchools]);


  /* =========================================
     FILTER STUDENTS
  ========================================= */

  const filteredStudents = useMemo(() => {
    const search = studentQuery.toLowerCase();

    return allStudents
      .filter(
        (student) =>
          student.SchoolName === SchoolName
      )
      .filter((student) =>
        student.StudentName
          ?.toLowerCase()
          .includes(search)
      );
  }, [allStudents, SchoolName, studentQuery]);


  /* =========================================
     DATE FORMAT
  ========================================= */

  const convertDateFormat = (date) => {
    if (!date) return "";

    const [year, month, day] = date.split("-");

    return `${day}-${month}-${year}`;
  };


  /* =========================================
     SEARCH
  ========================================= */

  const SearchHandler = async (e) => {
    e.preventDefault();

    if (!StudentName || !SchoolName || !newDOB) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const DOB = convertDateFormat(newDOB);

      const { data } = await axios.post(
        "https://kwizdom2-0-backend.onrender.com/api/forgot/new",
        {
          StudentName,
          DOB,
          SchoolName,
        }
      );

      setStudentData(data);

      if (data?._id) {
        navigate("/certificate");
      }
    } catch (error) {
      console.error("Error during search:", error);

      alert(
        "Unable to find the result. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="forgot-box">

      <section className="forgot">

        {/* =====================================
            LEFT CONTENT
        ===================================== */}

        <div className="forgot-content">

          {/* EVENT BANNER */}

          <div className="forgot-banner">
            <img
              src="/toplogo.jpeg"
              alt="Kwizdom 4.0"
            />
          </div>


          {/* FORM */}

          <form
            className="forgot-form"
            onSubmit={SearchHandler}
          >

            <div className="form-heading">

              <span className="form-eyebrow">
                KWIZDOM 4.0
              </span>

              <h1>
                Recover your result
              </h1>

              <p>
                Enter the required information to access
                your result and certificate.
              </p>

            </div>


            {/* SCHOOL */}

            <div className="forgot-field">

              <label htmlFor="school">
                School Name
              </label>

              <Combobox
                value={SchoolName}
                onChange={(value) => {
                  setSchoolName(value);
                  setStudentName("");
                  setStudentQuery("");
                }}
              >

                <div className="forgot-combobox">

                  <Combobox.Input
                    id="school"
                    className="forgot-input"
                    autoComplete="off"
                    value={SchoolName}
                    onChange={(event) =>
                      setSchoolQuery(event.target.value)
                    }
                    placeholder="Search or select your school"
                  />

                  <Combobox.Options className="forgot-options">

                    {filteredSchools.length > 0 ? (

                      filteredSchools
                        .slice(0, 8)
                        .map((school) => (

                          <Combobox.Option
                            key={school}
                            value={school}
                            className="forgot-option"
                          >

                            {({ active }) => (
                              <div
                                className={
                                  active
                                    ? "forgot-option-active"
                                    : ""
                                }
                              >
                                {school}
                              </div>
                            )}

                          </Combobox.Option>

                        ))

                    ) : (

                      <div className="no-results">
                        No school found
                      </div>

                    )}

                  </Combobox.Options>

                </div>

              </Combobox>

            </div>


            {/* STUDENT */}

            <div className="forgot-field">

              <label htmlFor="student">
                Student Name
              </label>

              <Combobox
                value={StudentName}
                onChange={setStudentName}
                disabled={!SchoolName}
              >

                <div className="forgot-combobox">

                  <Combobox.Input
                    id="student"
                    className="forgot-input"
                    autoComplete="off"
                    value={StudentName}
                    onChange={(event) =>
                      setStudentQuery(event.target.value)
                    }
                    placeholder={
                      SchoolName
                        ? "Search or select your name"
                        : "Select school first"
                    }
                  />

                  <Combobox.Options className="forgot-options">

                    {filteredStudents.length > 0 ? (

                      filteredStudents
                        .slice(0, 8)
                        .map((student) => (

                          <Combobox.Option
                            key={student._id}
                            value={student.StudentName}
                            className="forgot-option"
                          >

                            {({ active }) => (
                              <div
                                className={
                                  active
                                    ? "forgot-option-active"
                                    : ""
                                }
                              >
                                {student.StudentName}
                              </div>
                            )}

                          </Combobox.Option>

                        ))

                    ) : (

                      <div className="no-results">
                        {SchoolName
                          ? "No student found"
                          : "Select a school first"}
                      </div>

                    )}

                  </Combobox.Options>

                </div>

              </Combobox>

            </div>


            {/* DATE */}

            <div className="forgot-field">

              <label htmlFor="dob">
                Date of Birth
              </label>

              <input
                id="dob"
                type="date"
                className="forgot-input"
                value={newDOB}
                onChange={(e) =>
                  setNewDOB(e.target.value)
                }
              />

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="forgot-button"
              disabled={loading}
            >

              {loading
                ? "Searching..."
                : "Search Result"}

            </button>

          </form>

        </div>


        {/* =====================================
            RIGHT VISUAL
        ===================================== */}

        <div className="forgot-visual">

          <div className="visual-content">

            <span className="visual-badge">
              KWIZDOM 4.0
            </span>

            <h2>
              Find your
              <br />
              result.
            </h2>

            <p>
              Your achievement deserves to be
              remembered.
            </p>

            <img
              src="/forgot.png"
              alt="Find your result"
            />

          </div>

        </div>


        {/* =====================================
            SOCIAL
        ===================================== */}

        <div className="social-visible">

          <div className="social-links-fg">

            <a href="https://www.facebook.com/taazabengal">
              <img
                src="/fb.png"
                alt="Facebook"
              />
            </a>

            <a href="https://www.instagram.com/taazatvchannel/">
              <img
                src="/insta.png"
                alt="Instagram"
              />
            </a>

            <a href="https://www.youtube.com/@taazatv1632">
              <img
                src="/yt.png"
                alt="YouTube"
              />
            </a>

            <a href="#">
              <img
                src="/wa.png"
                alt="WhatsApp"
              />
            </a>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Forgot;