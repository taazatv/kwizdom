import React, { useContext, useRef } from "react";
import "./Certificate.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MyContext } from "../../store";
import { Link } from "react-router-dom";


const Certificate = () => {
  const { studentData, setStudentData } = useContext(MyContext);
  console.log(studentData);

  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0; // Updated value to remove space at the top
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("certificate.pdf");
    });
  };

  const id = studentData[0]._id

  return (
    <>
      <main className="certify-box">
        <div className="certify">
          <h1>Welcome Student</h1>
          {studentData &&
            studentData.length > 0 ?
            studentData.map((student) => {
              return (
                <div key={student._id}>
                  <p>Student Name: &nbsp;{student.StudentName}</p>
                  <p>School Name: &nbsp;{student.SchoolName}</p>
                </div>
              );
            }) : <p>NO Data</p>}

          <div>
            <Link to={`/request/${id}`} style={{textDecoration:"none",color:"black"}}><button>Change Request</button></Link>
            <button onClick={downloadPDF}>Download Result</button>
          </div>

          <div className="image" ref={pdfRef}>
            <h1>{studentData[0] && studentData[0].StudentName ? studentData[0].StudentName : ""}</h1>
          </div>

          <div className="social-visible">
            <div className="social-links-certify">
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
        </div>
      </main>
    </>
  );
};

export default Certificate;
