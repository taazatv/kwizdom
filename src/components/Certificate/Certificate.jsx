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
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
  
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(studentData.StudentName+".pdf");
    });
  };
  

  const id = studentData._id

  return (


    <>
       <main className="certify-box">
        <div className="certify">
          <h1>Welcome Student</h1>
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
            <Link to={`/request/${id}`} style={{textDecoration:"none",color:"black"}}><button>Correction in spelling?</button></Link>
            <button onClick={downloadPDF}>Download Result</button>
          </div>

          <p style={{fontSize: "2rem", fontWeight:900}}>Grade Table : </p>
          <img src= "/grade.png " style={{ width:"400px", marginBottom: "2rem"}}></img>
          <br />
          <img className= "herologo" src="herologo.png" width="500"></img>
          
          <div width={4800} height={3200} className ="image" ref={pdfRef}>
            <h1>{studentData && studentData.StudentName ? studentData.StudentName : "Student Name"}</h1>
           
              

            <h1 style={{transform: "translateY(30px) translateX(10rem)"}}>{studentData && studentData.SchoolName ? studentData.SchoolName : "School Name"}</h1>

            <img src= "/certificate.png" width= {4800}   height= {3200} style={{width:"385px",height:"545px"}}></img>
          </div>

        </div>
      </main>
    </> 
  );
};

export default Certificate;
