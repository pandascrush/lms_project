import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import sideicon1 from "../../../Asset/listicon.png";
import sideicon2 from "../../../Asset/videoicon.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import "./Coursevideos.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DOMPurify from "dompurify";
import Score from "./Score";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is included
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
  const [moduleName, setModuleName] = useState("");
  const [currentDepth, setCurrentDepth] = useState(1);
  const [cardContent, setCardContent] = useState(null);
  const [scoreDetails, setScoreDetails] = useState({
    score: 0,
    totalQuestions: 0,
    correctAnswers: 0,
  });
  const [chapter, setChapter] = useState([]);
  const [content, setContent] = useState(false);

  const { course, module, id } = useParams();
  const navigate = useNavigate();
  const now = (answeredQuestions.size / questions.length) * 100;
  const [showScoreCard, setShowScoreCard] = useState(false);
  const [attempts, setAttempts] = useState([]); // State to store all attempts

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}course/activity/${course}/${module}`
      )
      .then((res) => {
        console.log(res.data);

        const items = res.data.activities;
        setSidebarItems(items);
        setModuleName(res.data.modulename);

        if (items.length > 0) {
          const firstItem = items[0];
          if (firstItem.quiz_type_name) {
            handleContentChange("quiz", firstItem.questions);
          } else {
            handleContentChange("video", []);
          }
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [course, module]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/${course}/${module}`)
      .then((res) => {
        setChapter(res.data);
        // console.log(res.data);
      });
  }, []);

  const handleContentChange = (content, questions = []) => {
    setActiveContent(content);
    setQuestions(questions);
    setCurrentIndex(0);
    setAnsweredQuestions(new Set());
  };

  const handleNext = (a) => {
    if (activeContent === "quiz") {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        if (currentDepth === 1) {
          if (a === 2) {
            const nextVideoItem = sidebarItems.find(
              (item) => item.depth === "2"
            );
            setCurrentDepth(2);
            handleContentChange("video", []); // Change content to video, no questions for video
            setContent(false);
            setShowScoreCard(false);
          } else {
            // Show the score card after submitting the pre-assessment
            handleSubmitPreAssessment(); // Ensure this function handles showing the score card
            setShowScoreCard(true); // Show the score card
          }
        } else if (currentDepth === 2) {
          const nextQuizItem = sidebarItems.find((item) => item.depth === "3");
          if (nextQuizItem) {
            setCurrentDepth(3);
            handleContentChange("quiz", nextQuizItem.questions || []);
          }
        } else if (currentDepth === 3) {
          if (a === 2) {
            const nextVideoItem = sidebarItems.find(
              (item) => item.depth === "2"
            );
            setCurrentDepth(1);
            handleContentChange("quiz", []); // Change content to video, no questions for video
            setContent(false);
            setShowScoreCard(false);
          } else {
            // Show the score card after submitting the pre-assessment
            handleSubmitPostAssessment(); // Ensure this function handles showing the score card
            setShowScoreCard(true); // Show the score card
          }
        }
      }
    } else if (activeContent === "video") {
      const nextQuizItem = sidebarItems.find((item) => item.depth === "3");
      if (nextQuizItem) {
        setCurrentDepth(3);
        handleContentChange("quiz", nextQuizItem.questions || []);
      }
    }
  };

  const handlePrevious = () => {
    if (activeContent === "quiz" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOptions((prev) => ({
      ...prev,
      [currentIndex]: selectedOption,
    }));
    setAnsweredQuestions((prev) => new Set(prev).add(currentIndex));
  };

  const handleSubmitPreAssessment = () => {
    const userId = id === undefined || id === "undefined" ? 0 : id;
    // console.log(typeof userId);
    console.log(id);
    console.log(userId);

    const result = Object.keys(selectedOptions)
      .map((questionIndex) => {
        const question = questions[parseInt(questionIndex, 10)];
        if (!question) return null;
        return {
          question_id: question.id,
          user_answer: selectedOptions[questionIndex],
          correct: selectedOptions[questionIndex] === question.correct_answer,
        };
      })
      .filter(Boolean);

    axios
      .post(
        `${
          process.env.REACT_APP_API_URL
        }quiz/savequiz/${userId}/${1}/${module}`,
        {
          result,
        }
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.message === "Quiz attempt saved successfully") {
          setAttempts(res.data.attempts); // Store all attempts in state

          // setScoreDetails({
          //   score: res.data.score, // This is the score of the current attempt
          //   totalQuestions: res.data.totalQuestions,
          //   correctAnswers: res.data.correctAnswers,
          // });

          setShowScoreCard(true); // Set state to show score card
        } else {
          toast.error("Error saving quiz");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitPostAssessment = () => {
    const userId = id === undefined || id === "undefined" ? 0 : id;

    const result = Object.keys(selectedOptions)
      .map((questionIndex) => {
        const question = questions[parseInt(questionIndex, 10)];
        if (!question) return null;
        return {
          question_id: question.id,
          user_answer: selectedOptions[questionIndex],
          correct: selectedOptions[questionIndex] === question.correct_answer,
        };
      })
      .filter(Boolean);

    // console.log(result);

    axios
      .post(
        `${
          process.env.REACT_APP_API_URL
        }quiz/savequiz/${userId}/${2}/${module}`,
        {
          result,
        }
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.message === "Quiz attempt saved successfully") {
          setAttempts(res.data.attempts); // Store all attempts in state

          // setScoreDetails({
          //   score: res.data.score, // This is the score of the current attempt
          //   totalQuestions: res.data.totalQuestions,
          //   correctAnswers: res.data.correctAnswers,
          // });

          setShowScoreCard(true); // Set state to show score card
        } else {
          toast.error("Error saving quiz");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuestionClick = (index) => {
    setCurrentIndex(index);
  };

  const handleViewScore = () => {
    setShowScoreCard(false);
    setContent(true);
  };

  const handleAttempt = () => {
    console.log("attempt");

    if (currentDepth === 1) {
      setCurrentDepth(1);
      setContent(false);
      setShowScoreCard(false);

      handleContentChange(
        "quiz",
        sidebarItems.find((item) => item.depth === "1")?.questions || []
      );
    } else {
      setCurrentDepth(3);
      setContent(false);
      setShowScoreCard(false);
      const nextQuizItem = sidebarItems.find((item) => item.depth === "3");
      if (nextQuizItem) {
        setCurrentDepth(3);
        handleContentChange("quiz", nextQuizItem.questions || []);
      }
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewData, setReviewData] = useState([]);

  const handleReviewClick = () => {
    // Assuming `questions` is an array of questions with correct answers
    const reviewContent = questions.map((question, index) => {
      return {
        question: question.text,
        selectedAnswer: selectedOptions[index] || "No answer selected",
        correctAnswer: question.correct_answer,
      };
    });
    setReviewData(reviewContent);
    setIsReviewing(true);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const [startQuiz, setStartQuiz] = useState(false);

  // Function to handle starting the quiz
  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  const videoPaths = {
    1: "./../Videos/Who Am I_.mov", // replace with the actual path to the video in your project
    2: "path/to/module2/video.mp4", // replace with the actual path to the video in your project
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <ToastContainer />
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
                <b style={{ color: "#001040", fontSize: "11px" }}>
                  {moduleName && moduleName.length > 10 ? (
                    <>
                      {moduleName.slice(0, 10)} <br /> {moduleName.slice(10)}
                    </>
                  ) : (
                    moduleName || "Module"
                  )}
                </b>
              </p>
              {sidebarItems.map((item, index) => {
                const title = item.quiz_type_name || item.activity_name;

                // Limit title to 15 characters and break into two lines if necessary
                const formattedTitle =
                  title.length > 9 ? (
                    <>
                      {title.slice(0, 9)} <br /> {title.slice(9)}
                    </>
                  ) : (
                    title
                  );

                return (
                  <div
                    style={{ color: "#001040" }}
                    key={index}
                    className="card text-dark my-2 p-2 border-0 sideshadow"
                  >
                    <Link
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
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
                        alt={title}
                      />
                      {formattedTitle}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`col ${
              isSidebarOpen ? "col-sm-12 col-lg-6" : "col-sm-12 col-lg-6"
            } mt-5 secondpartquiz px-2`}
          >
            <div className="mt-lg-5">
              {loading && <Spinner animation="border" />}
              {error && (
                <>
                  <p>Content is not available</p>{" "}
                  <Link className="btn btn-success" to={`/user/${id}`}>
                    Home
                  </Link>
                </>
              )}
              {!startQuiz ? (
                // Show introductory content before quiz
                <div className="quizpart p-3 quizparttext">
                  <h1 className="profoundhead my-4">
                    To Me Testing Is A Profound Duty.
                  </h1>
                  <p>
                    To me, the questions within a test are not mere inquiries;
                    they are pivotal moments that spotlight transformative
                    knowledge. They present key insights with the power to bring
                    about a positive shift in your life.
                  </p>
                  <p>
                    Picture this: acquiring a treasure trove of 100 exceptional
                    points of wisdom about the spine—knowledge that empowers you
                    to shape your destiny afresh each day henceforth.
                  </p>
                  <p>
                    Know that these questions are composed with deep empathy and
                    with the greatest care, with your personal growth and
                    enlightenment at their core. They are a testament to my
                    dedication to your journey towards a brighter, more informed
                    future.
                  </p>
                  <p>Please learn and enjoy each question!</p>
                  <div className="d-flex justify-content-end">
                    <button
                      style={{ backgroundColor: "#001040", color: "white" }}
                      className="btn my-4"
                      onClick={handleStartQuiz}
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              ) : (
                activeContent === "quiz" &&
                !loading &&
                !error && (
                  <div>
                    {isReviewing ? (
                      <div className="review-container quizpart p-3 rounded-2">
                        <h3 className="quizrev">
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            onClick={() => setIsReviewing(false)}
                            style={{ color: "#f99420" }}
                          ></FontAwesomeIcon>{" "}
                          Review of the quiz:
                        </h3>
                        {reviewData.map((item, idx) => (
                          <div key={idx} className="review-item">
                            {/* Render question with HTML content using dangerouslySetInnerHTML */}
                            <p
                              dangerouslySetInnerHTML={{
                                __html: `Q${idx + 1}: ${DOMPurify.sanitize(
                                  item.question
                                )}`,
                              }}
                            />
                            <div
                              style={{ backgroundColor: "#ecfff7" }}
                              className="p-3"
                            >
                              {/* Render user's selected answer */}
                              <p className="ansreviewpara">{`Your Answer: ${item.selectedAnswer}`}</p>

                              {/* Render correct answer */}
                              <p>{`Correct Answer: ${item.correctAnswer}`}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : showScoreCard ? (
                      <div className="card quizpart p-4 d-flex flex-column justify-content-center align-items-center mx-2">
                        <h4 className="text-center">
                          Your answers were submitted.
                        </h4>
                        <button
                          className=" p-2 scbtn"
                          onClick={handleViewScore}
                        >
                          View Score
                        </button>
                      </div>
                    ) : content ? (
                      <div className="container">
                        <div className="quizpart p-3 quizparttext">
                          <h1 className="profoundhead my-4">
                            To Me Testing Is A Profound Duty.
                          </h1>
                          <p>
                            To me, the questions within a test are not mere
                            inquiries; they are pivotal moments that spotlight
                            transformative knowledge. They present key insights
                            with the power to bring about a positive shift in
                            your life.
                          </p>
                          <p>
                            Picture this: acquiring a treasure trove of 100
                            exceptional points of wisdom about the
                            spine—knowledge that empowers you to shape your
                            destiny afresh each day henceforth.
                          </p>
                          <p>
                            Know that these questions are composed with deep
                            empathy and with the greatest care, with your
                            personal growth and enlightenment at their core.
                            They are a testament to my dedication to your
                            journey towards a brighter, more informed future.
                          </p>
                          <p>Please learn and enjoy each question!</p>
                          <div className="d-flex justify-content-end"></div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            style={{
                              backgroundColor: "#001040",
                              color: "white",
                            }}
                            className="btn my-4"
                            onClick={handleAttempt}
                          >
                            Quiz Attempt
                          </button>
                        </div>
                        {/* Table displaying total questions and correct answers */}
                        <h4
                          className="summarytext my-5"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "20px",
                            margin: "10px 0px",
                            color: "#6705AD",
                          }}
                        >
                          Summary of Your Previous Attempts
                        </h4>
                        <div className="table-responsive">
                          {" "}
                          {/* Bootstrap class to make the table responsive */}
                          <table className="table mt-4 border-0 tabletextpart">
                            <thead>
                              <tr className="tabletextpart">
                                <th>Attempt</th>
                                <th>State</th>
                                <th>Marks</th>
                                <th>Grade</th>
                                <th>Review</th>
                              </tr>
                            </thead>
                            <tbody style={{ border: "0px" }}>
                              {attempts.map((attempt) => (
                                <tr key={attempt.id} style={{ border: "0px" }}>
                                  <td>{attempt.attempt_count}</td>
                                  <td>
                                    Finished
                                    <br />
                                    Submitted
                                    <br />
                                    {new Date(
                                      attempt.attempt_timestamp
                                    ).toLocaleString("en-US", {
                                      weekday: "long", // E.g., 'Saturday'
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </td>

                                  <td>{`${attempt.score} / 100`}</td>
                                  <td>{`${attempt.correctAnswers} / ${attempt.totalAnswers}`}</td>
                                  <td>
                                    <button
                                      style={{
                                        border: "0px",
                                      }}
                                      onClick={() => {
                                        if (currentDepth === 3) {
                                          handleReviewClick(); // Function to handle review action
                                        }
                                      }}
                                      disabled={currentDepth !== 3} // Disable button if depth is not 3
                                      className={`btn ${
                                        currentDepth === 3 ? "" : ""
                                      }`} // Optional: Add different styles for enabled/disabled
                                    >
                                      Review
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="d-flex justify-content-end">
                          <button
                            style={{ color: "001040" }}
                            className="nxtbtn rounded-2 my-5 px-5"
                            onClick={() => {
                              if (currentDepth === 1) {
                                handleNext(2); // Navigate to depth 2
                              } else if (currentDepth === 3) {
                                handleShow();
                              }
                            }}
                          >
                            {currentDepth === 3 ? "Next Chapter" : "NEXT"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="quizpart rounded-2 p-4">
                        <h4>Quiz {currentIndex + 1}:</h4>
                        <div
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              questions[currentIndex].text
                            ),
                          }}
                        />

                        <div className="options">
                          {questions[currentIndex].options.map(
                            (optionObj, index) => (
                              <div key={index} className="option d-flex">
                                <input
                                  type="radio"
                                  id={`option-${currentIndex}-${index}`}
                                  name={`question-${currentIndex}`}
                                  value={optionObj.option}
                                  checked={
                                    selectedOptions[currentIndex] ===
                                    optionObj.option
                                  }
                                  onChange={handleOptionChange}
                                />
                                <label
                                  className="mx-2"
                                  htmlFor={`option-${currentIndex}-${index}`}
                                >
                                  {optionObj.option}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                        <div className="d-flex justify-content-between my-3">
                          <button
                            className="prevbtn rounded-2"
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                          >
                            Previous
                          </button>
                          <button
                            style={{
                              backgroundColor: "#001040",
                              color: "white",
                            }}
                            className="btn btn-success"
                            onClick={handleNext}
                            disabled={!answeredQuestions.has(currentIndex)}
                          >
                            {currentIndex === questions.length - 1
                              ? currentDepth === 1
                                ? "Submit"
                                : currentDepth === 2
                                ? "Next Video"
                                : "Submit"
                              : "Next"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}

              {!loading && !error && activeContent === "video" && (
                <div>
                  <h4>{moduleName}</h4>
                  {/* Render all video content first */}
                  {sidebarItems
                    .filter((item) => item.depth === "2")
                    .map((item, index) => (
                      <div key={index} style={{ marginBottom: "20px" }}>
                        {/* Use the response HTML structure for embedding Vimeo video */}
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "380px", // Set fixed height for the video
                            zIndex: 0, // Ensure the content doesn't cover the button
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.page_content.replace(/<\/?p>/g, ""), // Clean up <p> tags
                            }}
                            style={{
                              position: "absolute", // Positioning the iframe absolutely to fill the container
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}

                  {/* Show the "Next" button after all videos have been rendered */}
                  <div
                    className="d-flex justify-content-end my-3"
                    style={{ position: "relative", zIndex: 10 }} // Ensure button is on top of other elements
                  >
                    <button
                      style={{
                        backgroundColor: "#001040",
                        color: "white",
                        zIndex: 10, // Ensure button is clickable
                      }}
                      className="btn prevbtn my-5"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-12 col-lg-3 mt-5">
            <div className="card py-2 px-2 my-3">
              <ProgressBar now={now} className="m-2 custom-progress-bar" />
              <div className="d-flex justify-content-between px-2">
                <p>Overall Progress</p>
                <p>{now.toFixed(0)}%</p>
              </div>
            </div>
            <hr />
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
            <h5>Chapters</h5>
            {chapter.map((e) => (
              <React.Fragment key={e.moduleid}>
                <div className="d-flex my-3">
                  <div className="orangecircle d-flex flex-column justify-content-center align-items-center">
                    <p className="m-2 numberclr">{e.moduleid}</p>
                  </div>
                  <div className="d-flex align-items-center card px-2 mx-3 rightcards border-0">
                    <p>
                      {e.modulename}{" "}
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className="text-dark px-4"
                      />
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} centered>
        <div style={{ backgroundColor: "#aa2af9" }}>
          <Modal.Header
            closeButton
            style={{ borderBottom: "none" }}
          ></Modal.Header>
          <Modal.Body
            className="d-flex flex-column justify-content-center align-items-center text-light"
            style={{ backgroundColor: "#aa2af9", padding: "20px" }}
          >
            <h5 className="mb-4">Well done! Chapter {module} is complete</h5>
            <p className="text-center">Rate Lesson</p>
            <div className="d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  size="2x"
                  color={rating >= star ? "gold" : "white"} // Gold if rated, otherwise transparent
                  onClick={() => handleRating(star)}
                  style={{ cursor: "pointer", margin: "0 5px" }}
                />
              ))}
            </div>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "#6705AD",
                border: "1px solid white",
                padding: "10px",
              }}
              onClick={() => {
                console.log(id);

                // Corrected condition
                if (id === "undefined" || id === undefined) {
                  handleClose(); // Close the modal
                  navigate(`/`); // Change the route to the default path
                  window.location.reload(); // Force a reload to fetch new content
                } else {
                  handleClose(); // Close the modal
                  navigate(`/ken/${course}/${parseInt(module) + 1}/${id}`); // Change the route with ID
                  window.location.reload(); // Force a reload to fetch new content
                }
              }}
              className="rounded-5 text-light my-4"
            >
              Continue to Chapter {parseInt(module) + 1}
            </Link>

            <p className="mt-3">
              You rated this: {rating} star{rating !== 1 && "s"}
            </p>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/user/${id}`}
            >
              Back to all lessons
            </Link>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default CourseVideos;
