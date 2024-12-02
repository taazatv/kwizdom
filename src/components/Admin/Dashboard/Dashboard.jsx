import React, { useContext, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import { MyContext } from "../../../store"

const Dashboard = () => {
  const { allStudents, setAllStudents } = useContext(MyContext);
  console.log(allStudents);

  useEffect(() => {
    const getStudents = async () => {
        const { data } = await axios.get("https://kwizdom2-0-backend.onrender.com/api/getAllStudents");
        setAllStudents(data);
      };

    getStudents();
  }, []);

  const getRequestChange = async(id) => {
    const {data} = await axios.put(`https://kwizdom2-0-backend.onrender.com/admin/${id}`)
    setAllStudents(data)
  }

  const approve = async(id) => {
    const confirm = window.confirm("Are you Sure ?")

    if(confirm){
      await getRequestChange(id)
      window.location.reload();
    }
}

  return (
    <>
    <div className="dashboard-box">
  
      <p className="tbl-head">STUDENT DATA</p>
      <main className="dashboard">
        <div>
          <p>Name</p>
          <p>Requested Name</p>
          <p>School Name</p>
          <p>Requested School Name</p>
          <p>Action</p>
        </div>

        {allStudents && allStudents.length > 0 && allStudents.map((student, key) => {
            return (
                <div className="table-body" key={student._id}>
                  <p>{student.StudentName}</p>
                  <p>{student.requestedName}</p>
                  <p>{student.SchoolName}</p>
                  <p>{student.requestedSchoolName}</p>
                  <div>
                    { student.requestedName === "No Request" ? <button style={{background:"yellow"}}>No Approval</button> : <button onClick={() => approve(student._id)}>Approve</button>}
                  </div>
                </div>
            );
          })}
      </main>
      </div>
    </>
  );
};

export default Dashboard;


//   const formatDate = (dob) => {
//     const dobDate = new Date(dob);
//     dobDate.setDate(dobDate.getDate() + 1);
//     return dobDate.toISOString().split("T")[0];
//   };
