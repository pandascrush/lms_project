import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    const emailPattern =
      /^[a-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Email validation
    if (!username) {
      setUsernameError("Username is required");
      valid = false;
    } else if (!emailPattern.test(username)) {
      setUsernameError("Invalid email format");
      valid = false;
    } else {
      setUsernameError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    // If valid, send data to API
    if (valid) {
      const loginData = { email: username, password };

      // console.log(loginData);
      axios
        .post("http://192.168.252.191:5000/auth/login", loginData)
        .then((res) => {
          console.log(res);
          const { user } = res.data;
          const { role_id, user_id } = user;
          console.log(role_id);
          if (role_id === 4) {
            navigate(`/${user_id}`);
          }
          else if(role_id === 1){
            navigate(`/admindashboard/${user_id}`)
          }
          else if(role_id === 2){
            navigate(`/instructordashboard/${user_id}`)
          }
        })
        .catch((err) => {
          toast.error("Invalid email or password");
        });
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="LoginApp">
      <ToastContainer />
      <div className="login-card px-1">
        <div className="login-form">
          <h1 className="logintxt">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="text-start">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              />
              {passwordError && (
                <div className="error-text">{passwordError}</div>
              )}
            </div>
            <div className="form-group button-container">
              <button type="submit" className="rounded-3">
                Login
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
