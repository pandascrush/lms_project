import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import pattern from "patternomaly";
import ProgressBar from "@ramonak/react-progress-bar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import face from '../../../Asset/Sibu.jpg'

export function Indiviualdashboardmain() {
  const { id } = useParams();

  const [user, setUser] = useState({ first_name: "", last_name: "", completion_percentage: 0 });
  const [workHours, setWorkHours] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeekDays = (startDate) => {
    const startOfWeek = moment(startDate).startOf("week");
    const daysOfWeek = [];

    for (let i = 0; i < 7; i++) {
      daysOfWeek.push({
        day: startOfWeek.format("ddd"),
        date: startOfWeek.format("YYYY-MM-DD"),
      });
      startOfWeek.add(1, "day");
    }
    return daysOfWeek;
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/user/${id}`)
      .then((res) => {
        const userData = res.data;
        setUser({
          first_name: userData.first_name.trim(),
          last_name: userData.last_name.trim(),
          completion_percentage: parseFloat(userData.completion_percentage),
        });
      })
      .catch((err) => {
        console.log("Error fetching user data", err);
      });
  }, [id]);

  useEffect(() => {
    const weekDays = getWeekDays(selectedDate);

    axios
      .get(
        `${process.env.REACT_APP_API_URL}user/userworkhour/${id}?weekStart=${weekDays[0].date}&weekEnd=${weekDays[6].date}`
      )
      .then((res) => {
        const workData = res.data;

        const hoursData = weekDays.map((day) => {
          const dayData = workData.find((item) => item.date === day.date);
          return dayData ? dayData.hours : 0;
        });

        setChartData({
          labels: weekDays.map((day) => `${day.day}`),
          datasets: [
            {
              label: "Working Hours",
              data: hoursData,
              backgroundColor: pattern.draw("diagonal-right-left", "#8f231b"),
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        console.log("Error fetching work hours data", err);
      });
  }, [id, selectedDate]);

  return (
    <>
      <div className="h-screen flex-grow-1 overflow-y-lg-auto">
        {/* Sidebar */}
        <div className="sidebar bg-light p-3">
          <h3 className="text-danger">My Spain Coach</h3>
          <ul className="list-unstyled">
            <li className="py-2">
              <a href="#" className="text-dark">
                Dashboard
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-dark">
                Overview
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-dark position-relative">
                Messages <span className="badge bg-primary position-absolute top-0 start-100 translate-middle">6</span>
              </a>
            </li>
          </ul>
          <a href="#" className="text-primary">
            Logout
          </a>
        </div>

        <header className="bg-surface-primary border-bottom pt-6">
          <div className="container-fluid">
            <div className="mb-npx">
              <div className="row align-items-center">
                <div className="col-sm-6 col-lg-12 mb-md-4 mb-sm-0">
                  <h1 className="h2 mb-0 ls-tight">
                    Hi, <span style={{ color: "#DC3545" }}>{user.first_name} {user.last_name}</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="row g-4 m-3">
          {/* Chart Section */}
          <div className="col-sm-12 col-lg-6">
            <div className="bg-white shadow p-4 rounded-4">
              <div className="text-center mb-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control w-50 mx-auto"
                />
              </div>
              <Bar
                key={JSON.stringify(chartData)}
                data={chartData}
                options={{
                  animation: {
                    duration: 2000,
                    delay: 30,
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Hours",
                        color: "#000000",
                      },
                      grid: { display: false },
                      ticks: {
                        color: "black",
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Days",
                        color: "#000000",
                      },
                      grid: { display: false },
                      ticks: {
                        color: "black",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: {
                        color: "#000000",
                      },
                    },
                    tooltip: {
                      titleColor: "white",
                      bodyColor: "white",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Profile Card Section */}
          <div className="col-sm-12 col-lg-5">
            <div className="card shadow rounded-4 p-4 text-center">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <img
                  src={face}
                  alt="Profile"
                  className="rounded-circle me-3"
                  style={{ width: "80px", height: "80px" }}
                />
                <div>
                  <h5 className="mb-0">{user.first_name} {user.last_name}</h5>
                  <p className="text-muted mb-0">Developer</p>
                </div>
              </div>

              <div className="progress-section">
                <span className="h6 font-semibold text-muted d-block mb-2">Course Completed</span>
                <ProgressBar
                  completed={user.completion_percentage}
                  bgColor="#8f231b"
                  animateOnRender={true}
                  transitionDuration="1s"
                  customLabel={`${user.completion_percentage}%`}
                />
              </div>

              {/* <button className="btn btn-danger rounded-5 mt-4">Edit</button> */}
            </div>
          </div>
        </div>

        <div className="container p-5">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            className="col"
            eventColor="#8f231b"
          />
        </div>
      </div>
    </>
  );
}
