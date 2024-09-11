import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import sideicon1 from "../../../Asset/listicon.png";
import sideicon2 from "../../../Asset/videoicon.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import "./Coursevideos.css";

function CourseVideos() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("quiz");
  const [sidebarItems, setSidebarItems] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [moduleName, setModuleName] = useState(""); // State for module name

  const { course, module } = useParams();
  const now = (answeredQuestions.size / questions.length) * 100;

  // Fetch Sidebar Data and handle quizzes and video content
  useEffect(() => {
    axios
      .get(`http://192.168.252.191:5000/course/activity/${course}/${module}`)
      .then((res) => {
        const items = res.data.activities;
        setSidebarItems(items);
        setModuleName(res.data.modulename); // Set module name from response

        // Set initial content based on the first sidebar item
        if (items.length > 0) {
          const firstItem = items[0];
          if (firstItem.quiz_type_name) {
            handleContentChange("quiz", firstItem.questions);
          } else {
            handleContentChange("video", []);
          }
        }

        setLoading(false); // Update loading state
      })
      .catch((err) => {
        setError(err);
        setLoading(false); // Update loading state
      });
  }, [course, module]);

  // Set content dynamically based on item type (Quiz or Video)
  const handleContentChange = (content, questions = []) => {
    setActiveContent(content);
    setQuestions(questions);
    setCurrentIndex(0); // Reset question index
    setAnsweredQuestions(new Set()); // Reset answered questions
  };

  // Handle question navigation
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Move to the next section when the last question is answered
      const nextItem = sidebarItems.find(
        (item) => item.quiz_type_name || item.activity_name
      );
      if (nextItem) {
        handleContentChange(
          nextItem.quiz_type_name ? "quiz" : "video",
          nextItem.questions || []
        );
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOptions((prev) => ({
      ...prev,
      [currentIndex]: selectedOption,
    }));
    setAnsweredQuestions((prev) => new Set(prev).add(currentIndex)); // Mark current question as answered
  };

  const handleSubmit = () => {
    const answersPayload = Object.keys(selectedOptions).map(
      (questionIndex) => ({
        question_id: questions[questionIndex].id,
        answer: selectedOptions[questionIndex],
      })
    );

    console.log(answersPayload);
    // Submit answers to backend
  };

  const handleQuestionClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className={`col-auto ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="btn btn-light toggle-button"
          >
            <FaBars />
          </button>
          <div
            className={`sidebar-content ${
              isSidebarOpen ? "d-block" : "d-none"
            }`}
          >
            <p className="my-4 sidetext p-2">
              <b>{moduleName || "Module"}</b> {/* Display module name */}
            </p>
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className="card text-dark my-2 p-2 border-0 sideshadow"
              >
                <Link
                  to="#"
                  className="sidebartext"
                  onClick={() =>
                    item.quiz_type_name
                      ? handleContentChange("quiz", item.questions)
                      : handleContentChange("video", [])
                  }
                >
                  <img
                    src={item.quiz_type_name ? sideicon1 : sideicon2}
                    className="mx-1 text-dark"
                    alt={item.quiz_type_name || item.activity_name}
                  />
                  {item.quiz_type_name || item.activity_name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`col ${
            isSidebarOpen ? "content-expanded" : "content-full"
          } mt-5 secondpartquiz px-5`}
        >
          <div className="mt-lg-5">
            <h4 className="coursechapter">Chapter 1 :</h4>
          </div>

          <div className="card quizpart p-4">
            {loading && <Spinner animation="border" />}
            {error && <p>Error loading content: {error.message}</p>}
            {/* Quiz Content */}
            {!loading &&
              !error &&
              activeContent === "quiz" &&
              questions.length > 0 && (
                <div>
                  <h4>Question {currentIndex + 1}:</h4>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: questions[currentIndex].text,
                    }}
                  />
                  <div className="options">
                    {questions[currentIndex].options.map((option, index) => (
                      <div key={index} className="option d-flex">
                        <input
                          type="radio"
                          id={`option-${currentIndex}-${index}`}
                          name={`question-${currentIndex}`}
                          value={option.option}
                          checked={
                            selectedOptions[currentIndex] === option.option
                          }
                          onChange={handleOptionChange}
                        />
                        <label
                          htmlFor={`option-${currentIndex}-${index}`}
                          className="mx-1"
                        >
                          {option.option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {/* Video Content */}
            {!loading && !error && activeContent === "video" && (
              <div>
                <h4>Video Content</h4>
                {sidebarItems
                  .filter((item) => item.depth == "2") // Filter items to get the right one
                  .map((item, index) => (
                    <iframe
                      key={index}
                      src={item.page_content.replace(/<\/?p>/g, "")} // Remove <p> tags if present
                      title="Video"
                      width="100%"
                      height="400"
                      allowFullScreen
                    ></iframe>
                  ))}
              </div>
            )}
          </div>

          {/* Question Navigation */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="rounded-2"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <b>Previous</b>
            </button>

            {/* Determine next step depending on current content */}
            {activeContent === "video" ? (
              <button
                onClick={() => {
                  // Navigate to post-assessment (depth 3) after video
                  const nextItem = sidebarItems.find(
                    (item) => item.depth === "3"
                  );
                  if (nextItem) {
                    if (nextItem.quiz_type_name) {
                      handleContentChange("quiz", nextItem.questions); // Post-assessment quiz
                    } else {
                      handleContentChange("video", []); // Other type of video content (if any)
                    }
                  }
                }}
              >
                Next Item
              </button>
            ) : (
              <button
                onClick={() => {
                  if (currentIndex < questions.length - 1) {
                    // Continue to next question in quiz
                    handleNext();
                  } else {
                    // If it's the last question, find the next section (depth 2 or depth 3)
                    const nextVideoItem = sidebarItems.find(
                      (item) => item.depth === "2"
                    );
                    if (nextVideoItem) {
                      handleContentChange("video", []); // Navigate to depth 2 video content
                    } else {
                      const nextPostAssessment = sidebarItems.find(
                        (item) => item.depth === "3"
                      );
                      if (nextPostAssessment) {
                        handleContentChange(
                          "quiz",
                          nextPostAssessment.questions
                        ); // Navigate to post-assessment (depth 3)
                      }
                    }
                  }
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Overall Progress */}
        <div className="col-sm-12 col-md-3 mt-5">
          <div className="card py-2 px-2 my-3">
            <ProgressBar now={now} className="m-2 custom-progress-bar" />
            <div className="d-flex justify-content-between px-2">
              <p>Overall Progress</p>
              <p>{now.toFixed(0)}%</p>
            </div>
          </div>

          {/* Circular Question Numbers */}
          <div className="circular-question-numbers d-flex flex-wrap border border-2 p-3 rounded-3">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`circle m-1 ${
                  currentIndex === index ? "active" : ""
                } ${answeredQuestions.has(index) ? "answered" : ""}`}
                onClick={() => handleQuestionClick(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseVideos;
