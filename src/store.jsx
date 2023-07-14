import React, { createContext, useState } from "react";

// Create the context
export const MyContext = createContext();

// Create the context provider component
export const MyContextProvider = ({ children }) => {
  const [studentData, setStudentData] = useState({});
  const [admin,setAdmin] = useState({})
  const [allStudents,setAllStudents] = useState([])

  return (
    <MyContext.Provider value={{ studentData, setStudentData,admin,setAdmin,allStudents,setAllStudents }}>
      {children}
    </MyContext.Provider>
  );
};
