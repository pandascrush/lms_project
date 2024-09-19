import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Toast } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const emailPattern = /^[a-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateInput = () => {
    let valid = true;

    // Validate email
    if (!username) {
      setUsernameError("Username is required");
      valid = false;
    } else if (!emailPattern.test(username)) {
      setUsernameError("Invalid email format");
      valid = false;
    } else {
      setUsernameError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    const loginData = { email: username, password };

    // axios.defaults.withCredentials = true;
    try {
      setIsLoading(true); // Start loading
      await axios
        .post(`${process.env.REACT_APP_API_URL}auth/login`, loginData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.message);

          const { user, token } = res.data; // Assuming response includes user and token
          const { role_id, user_id } = user;

          if (res.data.message === "Email and password are required") {
            toast.error("Email and password are required");
          } else if (
            res.data.message === "Invalid email or password raw data"
          ) {
            toast.error("Invalid email or password");
          } else if (res.data.message === "Invalid email or password") {
            toast.error("Invalid email or password");
          } else if (res.data.message === "login success") {
            if (role_id === 4) {
              navigate(`/user/${user_id}`);
            } else if (role_id === 1) {
              navigate(`/admindashboard/${user_id}`);
            } else if (role_id === 2) {
              navigate(`/instructordashboard/${user_id}/courselist`);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // Store token if needed (e.g., localStorage or state)
      // localStorage.setItem('authToken', token);
      // toast.success("Login successful!");
      // Navigate based on role_id
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="LoginApp">
      <ToastContainer />
      <div className="px-1">
        <div className="login-form">
          <h1 className="text-center">Sign In</h1>
          <p className="logpara">How can we feel to help better today ?</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="text-start">
                Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={usernameError ? "error-input" : ""}
              />
              {usernameError && (
                <div className="error-text">{usernameError}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-start">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={passwordError ? "error-input" : ""}
              />
              {passwordError && (
                <div className="error-text">{passwordError}</div>
              )}
            </div>
            <div className="form-group button-container">
              <button type="submit" className="rounded-3" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Sign In"}
              </button>
            </div>
            <p>
              Don't have an account?{" "}
              <span
                className="register-link fw-bold"
                onClick={handleRegisterClick}
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
