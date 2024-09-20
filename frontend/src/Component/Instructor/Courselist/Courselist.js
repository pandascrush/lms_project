import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Courselist.css"; // Ensure you have the CSS styles

function Courselist() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/course/getallcourse`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <div className="courselist-container">
      <h3 className="heading-center">Course Overview</h3>
      <div className="course-cards-container">
        {course.map((e, index) => (
          <div className="course-card" key={index}>
            {/* First Inner Card: Course Image and Title */}
            <div className="inner-card course-image-card">
              <img
                src={e.course_image.replace(/\\/g, "/")}
                alt={e.coursename}
                className="course-image"
              />
              <h5 className="course-title text-start">{e.coursename}</h5>
            </div>

            {/* Second Inner Card: Module Count and Course Details */}
            <div className="inner-card course-details-card text-start">
              <h5 className="details-heading">Course Details</h5>
              <p className="details-text">
                <strong>Modules:</strong> {e.module_count} <br />
                <strong>Start Date:</strong>{" "}
                {new Date(e.course_start_date).toLocaleDateString()} <br />
                <strong>End Date:</strong>{" "}
                {new Date(e.course_end_date).toLocaleDateString()} <br />
                <strong>Created At:</strong>{" "}
                {new Date(e.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Third Inner Card: User Statistics */}
            <div className="inner-card user-stats-card text-start">
              <h5 className="stats-heading">User Statistics</h5>
              <p className="stats-text">
                <strong>Enrolled:</strong> {e.enrolled_users} <br />
                <strong>Completed:</strong> {e.completed_users} <br />
                <strong>Active:</strong> {e.active_users}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courselist;
