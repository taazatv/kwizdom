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

  const id = studentData._id

  return (


    <>
       <main className="certify-box">
        <div className="certify">
          <h1>Welcome Student</h1>
          <img src="herologo.png" width="500"></img>
          {studentData &&
             (
                <div className = "details" key={studentData._id}>

                  <p>Student Name: &nbsp;{studentData.StudentName}</p>
                  <p>School Name: &nbsp;{studentData.SchoolName}</p>
                  <p>Grade: &nbsp;{studentData.Grade}</p>
                 
                </div>
              )
            } 

          <div>
            <Link to={`/request/${id}`} style={{textDecoration:"none",color:"black"}}><button>Change Request</button></Link>
            <button onClick={downloadPDF}>Download Result</button>
          </div>

          <p style={{fontSize: "2rem", fontWeight:900}}>Grade Table : </p>
          <img src= "/grade.png " style={{ marginLeft: "-4rem"}}></img>
           
          <div className="image" ref={pdfRef}>
            <h1>{studentData && studentData.StudentName ? studentData.StudentName : ""}</h1>
            <h1 style={{transform: "translateY(30px) translateX(-45px)"}}>{studentData && studentData.SchoolName ? studentData.SchoolName : ""}</h1>
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
