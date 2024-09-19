// import React, { useState } from "react";
// import regim from "../../../Asset/graduatedgirl.png";
// import "./Register.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function RegisterPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     phno: "",
//     email: "",
//     password: "",
//     password2: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     const nameRegex = /^[a-zA-Z\s.]{2,}$/;
//     const phoneRegex = /^[6-9][0-9]{9}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData.username || !nameRegex.test(formData.username)) {
//       tempErrors.username = "Enter your Name";
//     }
//     if (!formData.phno || !phoneRegex.test(formData.phno)) {
//       tempErrors.phno = "Invalid Mobile Number";
//     }
//     if (!formData.email || !emailRegex.test(formData.email)) {
//       tempErrors.email = "Invalid email format.";
//     }
//     if (!formData.password || formData.password.length < 8) {
//       tempErrors.password = "Password must be at least 8 characters long.";
//     }
//     if (formData.password !== formData.password2) {
//       tempErrors.password2 = "Passwords do not match.";
//     }

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleLoginClick = () => {
//     navigate("/login"); // Ensure '/login' is the correct path for your login page
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const key = {
//         name: formData.username,
//         email: formData.email,
//         phone_no: formData.phno,
//         password: formData.password2,
//       };
//       axios
//         .post(${process.env.REACT_APP_API_URL}/auth/register, key)
//         .then((res) => {
//           if (res.data.message === "User registered successfully.") {
//             toast.success("Registration Success");
//             navigate("/login"); // Redirect to login page after successful registration
//           } else if (res.data.message === "All fields are required.") {
//             toast.error("All fields are required.");
//           } else if (
//             res.data.message ===
//             "Email or Phone number already exists in User table."
//           ) {
//             toast.error("Email or Phone number already exists in User table.");
//           } else if (
//             res.data.message === "Email already exists in Auth table."
//           ) {
//             toast.error("Email already exists in Auth table.");
//           } else if (res.data.message === "Error inserting into User table.") {
//             toast.error("Error inserting into User table.");
//           }
//         })
//         .catch((e) => {
//           toast.error("An error occurred. Please try again.");
//         });
//     } else {
//       console.log("Form has errors");
//     }
//   };

//   return (
//     <div className="RegisterApp">
//       <ToastContainer />
//       <div className="register-card">
//         <div className="login-form">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="username">First Name</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Enter your name"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//               {errors.username && (
//                 <div className="error-message text-danger">
//                   {errors.username}
//                 </div>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="username">Last Name</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Enter your name"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//               {errors.username && (
//                 <div className="error-message text-danger">
//                   {errors.username}
//                 </div>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="phno">Mobile Number</label>
//               <input
//                 type="text"
//                 id="phno"
//                 name="phno"
//                 placeholder="Enter your mobile number"
//                 value={formData.phno}
//                 onChange={handleChange}
//               />
//               {errors.phno && (
//                 <div className="error-message text-danger">{errors.phno}</div>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               {errors.email && (
//                 <div className="error-message text-danger">{errors.email}</div>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Enter a strong password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               {errors.password && (
//                 <div className="error-message text-danger">
//                   {errors.password}
//                 </div>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="password2">Retype Password</label>
//               <input
//                 type="password"
//                 id="password2"
//                 name="password2"
//                 placeholder="Retype your password"
//                 value={formData.password2}
//                 onChange={handleChange}
//               />
//               {errors.password2 && (
//                 <div className="error-message text-danger">
//                   {errors.password2}
//                 </div>
//               )}
//             </div>
//             <div className="form-group button-container">
//               <button type="submit" className="rounded-3">
//                 Register
//               </button>
//             </div>
//           </form>
//           <p>Already have an account? <span className="register-link fw-bold" onClick={handleLoginClick}>
//             Login
//           </span></p>
//         </div>
//         <div className="login-image">
//           <img src={regim} alt="register" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;

import React, { useState } from "react";
import regim from "../../../Asset/graduatedgirl.png";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phno: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    const nameRegex = /^[a-zA-Z\s.]{2,}$/;
    const phoneRegex = /^[6-9][0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
      tempErrors.firstName = "Enter your First Name";
    }
    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
      tempErrors.lastName = "Enter your Last Name";
    }
    if (!formData.phno || !phoneRegex.test(formData.phno)) {
      tempErrors.phno = "Invalid Mobile Number";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
    }
    if (!formData.password || formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long.";
    }
    // if (formData.password !== formData.password2) {
    //   tempErrors.password2 = "Passwords do not match.";
    // }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLoginClick = () => {
    navigate("/login"); // Ensure '/login' is the correct path for your login page
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const key = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone_no: formData.phno,
        password: formData.password,
      };
      console.log(key);

      axios
        .post("${process.env.REACT_APP_API_URL}/auth/register", key)
        .then((res) => {
          if (res.data.message === "All fields are required.") {
            toast.success("All fields are required.");
            navigate("/login"); // Redirect to login page after successful registration
          } else if (
            res.data.message === "Error checking email in User table."
          ) {
            toast.error("Error checking email in User table.");
          } else if (
            res.data.message === "Email already exists in User table."
          ) {
            toast.error("Email already exists in User table.");
          } else if (
            res.data.message === "Error checking email in Auth table."
          ) {
            toast.error("Error checking email in Auth table.");
          } else if (
            res.data.message === "Email already exists in Auth table."
          ) {
            toast.error("Email already exists in Auth table.");
          } else if (res.data.message === "Error inserting into User table.") {
            toast.error("Error inserting into User table.");
          } else if (res.data.message === "Error inserting into Auth table.") {
            toast.error("Error inserting into Auth table.");
          } else if (
            res.data.message === "Error inserting into Context table."
          ) {
            toast.error("Error inserting into Context table.");
          } else if (
            res.data.message === "Error updating User table with context_id."
          ) {
            toast.error("Error updating User table with context_id.");
          } else if (
            res.data.message === "Registration failed. Please try again."
          ) {
            toast.error("Registration failed. Please try again.");
          } else if (res.data.message === "User registered successfully.") {
            console.log("User registered successfully.");
            toast.success("User registered successfully.");
          }
        })
        .catch((e) => {
          toast.error("An error occurred. Please try again.");
        });
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className="RegisterApp">
      <ToastContainer />
      <div className="register-card">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName" className="text-start">
                <b>First Name</b>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <div className="error-message text-danger">
                  {errors.firstName}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="text-start">
                <b>Last Name</b>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <div className="error-message text-danger">
                  {errors.lastName}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phno" className="text-start">
                <b>Mobile Number</b>
              </label>
              <input
                type="text"
                id="phno"
                name="phno"
                placeholder="Enter your mobile number"
                value={formData.phno}
                onChange={handleChange}
              />
              {errors.phno && (
                <div className="error-message text-danger">{errors.phno}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-start">
                <b>Email</b>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email id"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="error-message text-danger">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-start">
                <b>Password</b>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter a strong password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="error-message text-danger">
                  {errors.password}
                </div>
              )}
            </div>
            {/* <div className="form-group">
              <label htmlFor="password2">Retype Password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder="Retype your password"
                value={formData.password2}
                onChange={handleChange}
              />
              {errors.password2 && (
                <div className="error-message text-danger">
                  {errors.password2}
                </div>
              )}
            </div> */}
            <div className="form-group button-container">
              <button type="submit" className="rounded-3">
                Register
              </button>
            </div>
          </form>
          <p>
            Already have an account?{" "}
            <span className="register-link fw-bold" onClick={handleLoginClick}>
              Login
            </span>
          </p>
        </div>
        <div className="login-image">
          <img src={regim} alt="register" />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
