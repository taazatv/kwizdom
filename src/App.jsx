import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResult from "./components/SearchResult/SearchResult";
import Header from "./components/Header/Header";
import Forgot from "./components/Forgot/Forgot";
import ChangeRequest from "./components/ChangeRequest/ChangeRequest";
import Certificate from "./components/Certificate/Certificate";
import Login from "./components/Login/Login";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Coming from "./components/Coming/Coming";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Coming/>}/>
          <Route path="/search" element={<SearchResult />} />
          <Route path="/forgot" element={<Forgot/>}/>
          <Route path="/request/:id" element={<ChangeRequest/>}/>
          <Route path="/certificate" element={<Certificate/>}/>

          <Route path="/signin" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
