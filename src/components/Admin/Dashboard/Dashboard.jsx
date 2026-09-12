import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { MyContext } from "../../../store";

const API = "https://kwizdom2-0-backend.onrender.com";

const Dashboard = () => {
  const { allStudents, setAllStudents } = useContext(MyContext);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(null);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [studentsResponse, requestsResponse] = await Promise.all([
        axios.get(`${API}/api/getAllStudents`),
        axios.get(`${API}/admin/edit-requests`)
      ]);

      const studentsData = Array.isArray(studentsResponse.data)
        ? studentsResponse.data
        : studentsResponse.data?.data || [];

      const requestsData = Array.isArray(requestsResponse.data)
        ? requestsResponse.data
        : requestsResponse.data?.data || [];

      setAllStudents(studentsData);
      setRequests(requestsData);

    } catch (error) {
      console.error("Dashboard fetch error:", error);

      setError(
        error?.response?.data?.message ||
        "Unable to fetch dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const approve = async (requestId) => {
    const confirmApproval = window.confirm(
      "Are you sure you want to approve this correction?"
    );

    if (!confirmApproval) return;

    try {
      setApproving(requestId);

      await axios.put(`${API}/admin/edit-requests/${requestId}/approve`);

      await fetchDashboardData();

    } catch (error) {
      console.error("Approval error:", error);

      alert(
        error?.response?.data?.message ||
        "Unable to approve the request."
      );
    } finally {
      setApproving(null);
    }
  };

  return (
    <main className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <span>KWIZDOM 4.0</span>
          <h1>Admin Dashboard</h1>
          <p>Manage student correction requests and results.</p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchDashboardData}
          disabled={loading}
        >
          <i className="bi bi-arrow-clockwise"></i>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      <div className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <span>Total Students</span>
            <strong>{allStudents?.length || 0}</strong>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">
            <i className="bi bi-clock-history"></i>
          </div>

          <div>
            <span>Pending Requests</span>
            <strong>{requests?.length || 0}</strong>
          </div>
        </div>

      </div>

      {error && (
        <div className="dashboard-error">
          <i className="bi bi-exclamation-circle"></i>
          {error}
        </div>
      )}

      <section className="requests-card">

        <div className="requests-header">
          <div>
            <span>STUDENT CORRECTIONS</span>
            <h2>Correction Requests</h2>
          </div>

          <div className="request-count">
            {requests?.length || 0} Pending
          </div>
        </div>

        {loading ? (
          <div className="dashboard-loading">
            <div className="dashboard-spinner"></div>
            <p>Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="empty-requests">
            <div className="empty-icon">
              <i className="bi bi-check2-circle"></i>
            </div>

            <h3>No pending requests</h3>
            <p>
              Student correction requests will appear here when submitted.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">

            <table className="requests-table">

              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Requested Name</th>
                  <th>School Name</th>
                  <th>Requested School</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => (
                  <tr key={request._id}>

                    <td>
                      <div className="student-name">
                        {request.StudentName || "—"}
                      </div>
                    </td>

                    <td>
                      <div className="requested-value">
                        {request.requestedName || "No change"}
                      </div>
                    </td>

                    <td>
                      {request.SchoolName || "—"}
                    </td>

                    <td>
                      <div className="requested-value">
                        {request.requestedSchoolName || "No change"}
                      </div>
                    </td>

                    <td>
                      <button
                        className="approve-button"
                        onClick={() => approve(request._id)}
                        disabled={approving === request._id}
                      >
                        {approving === request._id ? (
                          <>
                            <span className="button-spinner"></span>
                            Approving...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-lg"></i>
                            Approve
                          </>
                        )}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </section>

    </main>
  );
};

export default Dashboard;