import React, { useContext, useRef } from "react";
import "./Certificate.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MyContext } from "../../store";
import { Link } from "react-router-dom";

const Certificate = () => {
  const { studentData } = useContext(MyContext);

  console.log("STUDENT DATA:", studentData);

  const pdfRef = useRef(null);

  /*
   * Keep the existing functionality.
   * These fallbacks only make the UI work even if
   * MongoDB field capitalization differs.
   */

  const student = Array.isArray(studentData)
    ? studentData[0]
    : studentData;

  const studentName =
    student?.StudentName ||
    student?.studentName ||
    student?.Name ||
    student?.name ||
    "";

  const schoolName =
    student?.SchoolName ||
    student?.schoolName ||
    student?.School ||
    student?.school ||
    "";

  const grade =
    student?.Grade ||
    student?.grade ||
    student?.GradeName ||
    student?.gradeName ||
    "";

  const id = student?._id || "";


  /* =====================================================
     DOWNLOAD PDF
     ===================================================== */

  const downloadPDF = async () => {
    const input = pdfRef.current;

    if (!input) {
      console.error("Certificate element not found");
      return;
    }

    try {
      const canvas = await html2canvas(input, {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(
        pdfWidth / imgWidth,
        pdfHeight / imgHeight
      );

      const imgX =
        (pdfWidth - imgWidth * ratio) / 2;

      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save(
        `${studentName || "Kwizdom-Student"}-Certificate.pdf`
      );

    } catch (error) {
      console.error(
        "Certificate download error:",
        error
      );
    }
  };


  return (
    <main className="certify-box">

      {/* =================================================
          BACKGROUND WATERMARK
      ================================================= */}

      <div
        id="watermark"
        aria-hidden="true"
      >
        RESULTS
      </div>


      <div className="certify">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="certificate-header">

          <div className="header-copy">

            <span className="certificate-kicker">
              KWIZDOM 4.0
            </span>

            <h1>
              Welcome Student
            </h1>

            <p>
              Your result and certificate
            </p>

          </div>

        </header>


        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="result-column">

          {/* ===============================================
              STUDENT INFORMATION
          =============================================== */}

          <section className="student-details-card">

            <div className="card-heading">

              <div>
                <span>
                  RESULT DETAILS
                </span>

                <h2>
                  Student Information
                </h2>
              </div>

              <div className="verified-badge">
                RESULT
              </div>

            </div>


            <div className="student-detail">

              <div className="detail-label">
                Student Name
              </div>

              <div className="detail-value">
                {studentName || "—"}
              </div>

            </div>


            <div className="student-detail">

              <div className="detail-label">
                School Name
              </div>

              <div className="detail-value">
                {schoolName || "—"}
              </div>

            </div>


            <div className="student-detail last-detail">

              <div className="detail-label">
                Grade
              </div>

              <div className="detail-value grade-value">
                {grade || "—"}
              </div>

            </div>

          </section>


          {/* ===============================================
              ACTIONS
          =============================================== */}

          <div className="certificate-actions">

            <Link
              to={`/request/${id}`}
              className="correction-link"
            >
              <button type="button">
                Correction in spelling?
              </button>
            </Link>


            <button
              type="button"
              className="download-button"
              onClick={downloadPDF}
            >
              <span className="download-icon">
                ↓
              </span>

              Download Result
            </button>

          </div>


          {/* ===============================================
              GRADE TABLE
          =============================================== */}

          <section className="grade-section">

            <div className="section-heading">

              <div className="heading-line"></div>

              <div>
                <span>
                  PERFORMANCE
                </span>

                <h2>
                  Grade Table
                </h2>
              </div>

            </div>


            <div className="grade-card">

              <img
                src="/grade.png"
                alt="Grade Table"
                className="grade-image"
              />

            </div>

          </section>

        </div>


        {/* =================================================
            RIGHT SIDE — CERTIFICATE
        ================================================= */}

        <section className="certificate-column">

          <div className="certificate-heading">

            <div>

              <span>
                OFFICIAL CERTIFICATE
              </span>

              <h2>
                Certificate of Participation
              </h2>

            </div>

            <div className="certificate-status">
              VERIFIED
            </div>

          </div>


          {/* =================================================
              ACTUAL CERTIFICATE

              Everything inside this element is captured
              into the PDF.
          ================================================= */}

          <div
            className="certificate-section"
            ref={pdfRef}
          >

            <div className="certificate">

              <img
                src="/certificate.jpeg"
                alt="Kwizdom Certificate"
                className="certificate-bg"
              />


              {/* -----------------------------------------
                  STUDENT NAME
              ------------------------------------------ */}

              <div className="certificate-name">
                {studentName}
              </div>


              {/* -----------------------------------------
                  SCHOOL NAME
              ------------------------------------------ */}

              <div className="certificate-school">
                {schoolName}
              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Certificate;