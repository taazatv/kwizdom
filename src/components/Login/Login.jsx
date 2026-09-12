import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { MyContext } from "../../store";
import axios from "axios";

const Login = () => {
  const { setAdmin } = useContext(MyContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    if (!email && !password) {
      setError("Please fill all the fields");
      return;
    }

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://kwizdom2-0-backend.onrender.com/admin/signin",
        {
          email,
          password,
        }
      );

      if (data?.message) {
        setError(data.message);
        return;
      }

      if (data) {
        setAdmin(data);
        navigate("/dashboard");
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error?.response?.data?.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">

        <section className="login-brand">
          <div className="brand-logo">
            <img src="/herologo.jpeg" alt="KWIZDOM 4.0" />
          </div>

          <div className="brand-content">
            <span className="brand-tag">KWIZDOM 4.0</span>

            <h2>
              Manage the
              <br />
              <strong>Quiz Experience.</strong>
            </h2>

            <p>
              Access the KWIZDOM administration panel to manage
              students, results and competition data.
            </p>

            <div className="brand-line">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </section>

        <section className="login-card">

          <div className="login-card-header">
            <div className="login-icon">
              <i className="bi bi-shield-lock"></i>
            </div>

            <div>
              <span className="login-label">ADMIN PORTAL</span>
              <h1>Sign In</h1>
            </div>
          </div>

          <p className="login-description">
            Sign in to continue to the KWIZDOM administration panel.
          </p>

          <form onSubmit={submitHandler}>

            <div className="login-field">
              <label htmlFor="email">Email Address</label>

              <div className="input-wrapper">
                <i className="bi bi-envelope"></i>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <i className="bi bi-lock"></i>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="login-error">
                <i className="bi bi-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <i className="bi bi-arrow-right"></i>
                </>
              )}
            </button>

          </form>

          <div className="login-footer">
            <span>Powered by</span>
            <strong>Taaza TV</strong>
          </div>

        </section>

      </div>

      <div className="login-bottom">
        <span>KWIZDOM 4.0</span>
        <span>•</span>
        <span>Taaza TV</span>
      </div>
    </main>
  );
};

export default Login;