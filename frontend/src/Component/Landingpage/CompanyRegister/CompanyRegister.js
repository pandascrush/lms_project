import React, { useState } from "react";
import axios from "axios";

function CompanyRegister() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    country: "",
    zipcode: "",
    companyPhone: "",
    spocName: "",
    spocEmail: "",
    spocPhone: "",
    companySize: "",
    companyType: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form inputs
  const validate = () => {
    let formErrors = {};
    if (!formData.companyName)
      formErrors.companyName = "Company Name is required";
    if (!formData.companyEmail)
      formErrors.companyEmail = "Company Email is required";
    if (!formData.spocName) formErrors.spocName = "SPOC Name is required";
    if (!formData.spocEmail) formErrors.spocEmail = "SPOC Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.companyPhone)
      formErrors.companyPhone = "Company Phone is required";
    // Add more validation logic as needed

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Map the form data to the expected backend format
    const mappedData = {
      company_name: formData.companyName,
      company_email_id: formData.companyEmail,
      country: formData.country,
      zipcode: formData.zipcode,
      company_phone_number: formData.companyPhone,
      spoc_name: formData.spocName,
      spoc_email_id: formData.spocEmail,
      spoc_phone_number: formData.spocPhone,
      company_size: formData.companySize,
      company_type: formData.companyType,
      password: formData.password,
    };

    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}auth/business_register`, mappedData)
        .then((res) => {
          console.log(res);
          if (res.data.message === "Business registered successfully") {
            alert("Registered successfully");
          }
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <h2>Register Your Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="form-control"
          />
          {errors.companyName && (
            <p className="error-text">{errors.companyName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="companyEmail">Company Email</label>
          <input
            type="email"
            name="companyEmail"
            id="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            className="form-control"
          />
          {errors.companyEmail && (
            <p className="error-text">{errors.companyEmail}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipcode">Zipcode</label>
          <input
            type="text"
            name="zipcode"
            id="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyPhone">Company Phone Number</label>
          <input
            type="text"
            name="companyPhone"
            id="companyPhone"
            value={formData.companyPhone}
            onChange={handleChange}
            className="form-control"
          />
          {errors.companyPhone && (
            <p className="error-text">{errors.companyPhone}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="spocName">SPOC Name</label>
          <input
            type="text"
            name="spocName"
            id="spocName"
            value={formData.spocName}
            onChange={handleChange}
            className="form-control"
          />
          {errors.spocName && <p className="error-text">{errors.spocName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="spocEmail">SPOC Email</label>
          <input
            type="email"
            name="spocEmail"
            id="spocEmail"
            value={formData.spocEmail}
            onChange={handleChange}
            className="form-control"
          />
          {errors.spocEmail && <p className="error-text">{errors.spocEmail}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="spocPhone">SPOC Phone Number</label>
          <input
            type="text"
            name="spocPhone"
            id="spocPhone"
            value={formData.spocPhone}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="companySize">Company Size</label>
          <input
            type="text"
            name="companySize"
            id="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyType">Company Type</label>
          <input
            type="text"
            name="companyType"
            id="companyType"
            value={formData.companyType}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default CompanyRegister;
