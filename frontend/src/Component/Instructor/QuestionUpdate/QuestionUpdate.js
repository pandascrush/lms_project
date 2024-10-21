import axios from "axios";
import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react"; // Assuming JoditEditor is already installed

function QuestionUpdate() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [updatedQuestions, setUpdatedQuestions] = useState({});
  const [showFeedbackEditor, setShowFeedbackEditor] = useState({}); // Track which feedback editors are visible

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getmodule`)
      .then((res) => {
        setModules(res.data.result);
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
      });
  }, []);

  const handleModuleChange = (e) => {
    const moduleId = e.target.value;
    setSelectedModuleId(moduleId);

    axios
      .get(
        `${process.env.REACT_APP_API_URL}quiz/getmodulequestions/${moduleId}`
      )
      .then((res) => {
        console.log(res);

        setQuestions(res.data.result);
        const initialUpdatedQuestions = {};
        const initialShowFeedbackEditor = {};
        res.data.result.forEach((q) => {
          initialUpdatedQuestions[q.id] = {
            text: q.text,
            options: q.option.map((opt) => ({
              ...opt,
              feedback: opt.feedback, // Track feedback separately
            })),
            correct_answer: q.correct_answer,
          };

          // Initially hide the feedback editor for each option
          q.option.forEach((opt, index) => {
            initialShowFeedbackEditor[`${q.id}_${index}`] = false;
          });
        });
        setUpdatedQuestions(initialUpdatedQuestions);
        setShowFeedbackEditor(initialShowFeedbackEditor);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
      });
  };

  const handleQuestionChange = (questionId, field, value) => {
    setUpdatedQuestions({
      ...updatedQuestions,
      [questionId]: {
        ...updatedQuestions[questionId],
        [field]: value,
      },
    });
  };

  const handleOptionChange = (questionId, index, field, value) => {
    const updatedOptions = [...updatedQuestions[questionId].options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value,
    };
    setUpdatedQuestions({
      ...updatedQuestions,
      [questionId]: {
        ...updatedQuestions[questionId],
        options: updatedOptions,
      },
    });
  };

  const toggleFeedbackEditor = (questionId, index) => {
    setShowFeedbackEditor((prevState) => ({
      ...prevState,
      [`${questionId}_${index}`]: !prevState[`${questionId}_${index}`],
    }));
  };

  const handleSubmit = () => {
    console.log(selectedModuleId, updatedQuestions);

    axios
      .post(`${process.env.REACT_APP_API_URL}quiz/updatequestion`, {
        moduleId: selectedModuleId,
        questions: updatedQuestions,
      })
      .then((res) => {
        console.log(res.data);
        if (
          res.data.error === "An error occurred while updating the question"
        ) {
          alert("An error occurred while updating the question");
        } else if (res.data.message === "Questions updated successfully") {
          alert("Questions updated successfully");
        }
      })
      .catch((err) => {
        console.error("Error updating questions:", err);
      });
  };

  return (
    <>
      <h2 className="text-center">Update Questions</h2>
      <div className=" container entirequizpart p-4 rounded-3">
        {/* Select Box for Modules */}
        <div>
          <label className="py-4">
            <b>Select Module:</b>
          </label>
          <br />
          <select value={selectedModuleId} onChange={handleModuleChange}>
            <option value="">Select Module</option>
            {modules.map((module) => (
              <option key={module.moduleid} value={module.moduleid}>
                {module.modulename}
              </option>
            ))}
          </select>
        </div>

        {/* Display Questions */}
        <div className="py-5">
          <h5>Questions for Selected Module:</h5>
          {questions.length > 0 ? (
            <ul>
              {questions.map((question) => (
                <li key={question.id}>
                  {/* Rich text editor for question text */}
                  <JoditEditor
                    value={updatedQuestions[question.id].text}
                    onBlur={(newText) =>
                      handleQuestionChange(question.id, "text", newText)
                    }
                  />

                  {/* Descriptive Question Type */}
                  {question.question_type === "descriptive" && (
                    <div>
                      <h4>Multiple Choice Options</h4>
                      {updatedQuestions[question.id].options.map(
                        (opt, index) => (
                          <div key={index} style={{ marginBottom: "15px" }}>
                            <label>Option:</label>
                            <textarea
                              value={opt.option}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "option",
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={40}
                            />

                            {/* Add Feedback Button */}
                            <button
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#001040",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                toggleFeedbackEditor(question.id, index)
                              }
                            >
                              {showFeedbackEditor[`${question.id}_${index}`]
                                ? "Hide Feedback"
                                : "Add Feedback"}
                            </button>

                            {/* Conditionally show rich text editor for feedback */}
                            {showFeedbackEditor[`${question.id}_${index}`] && (
                              <div style={{ marginTop: "10px" }}>
                                <label>Feedback:</label>
                                <JoditEditor
                                  value={opt.feedback}
                                  onBlur={(newFeedback) =>
                                    handleOptionChange(
                                      question.id,
                                      index,
                                      "feedback",
                                      newFeedback
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Multiple Choice Question Type */}
                  {question.question_type === "multiple_choice" && (
                    <div>
                      <h4>Multiple Choice Options</h4>
                      {updatedQuestions[question.id].options.map(
                        (opt, index) => (
                          <div key={index} style={{ marginBottom: "15px" }}>
                            <label>Option:</label>
                            <textarea
                              value={opt.option}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "option",
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={40}
                            />

                            {/* Add Feedback Button */}
                            <button
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#001040",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                toggleFeedbackEditor(question.id, index)
                              }
                            >
                              {showFeedbackEditor[`${question.id}_${index}`]
                                ? "Hide Feedback"
                                : "Add Feedback"}
                            </button>

                            {/* Conditionally show rich text editor for feedback */}
                            {showFeedbackEditor[`${question.id}_${index}`] && (
                              <div style={{ marginTop: "10px" }}>
                                <label>Feedback:</label>
                                <JoditEditor
                                  value={opt.feedback}
                                  onBlur={(newFeedback) =>
                                    handleOptionChange(
                                      question.id,
                                      index,
                                      "feedback",
                                      newFeedback
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Check Question Type */}
                  {question.question_type === "check" && (
                    <div>
                      <h4>Check Options</h4>
                      {updatedQuestions[question.id].options.map(
                        (opt, index) => (
                          <div key={index} style={{ marginBottom: "15px" }}>
                            <label>Option:</label>
                            <textarea
                              value={opt.option}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "option",
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={40}
                            />

                            {/* Add Feedback Button */}
                            <button
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#001040",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                toggleFeedbackEditor(question.id, index)
                              }
                            >
                              {showFeedbackEditor[`${question.id}_${index}`]
                                ? "Hide Feedback"
                                : "Add Feedback"}
                            </button>

                            {/* Conditionally show rich text editor for feedback */}
                            {showFeedbackEditor[`${question.id}_${index}`] && (
                              <div style={{ marginTop: "10px" }}>
                                <label>Feedback:</label>
                                <JoditEditor
                                  value={opt.feedback}
                                  onBlur={(newFeedback) =>
                                    handleOptionChange(
                                      question.id,
                                      index,
                                      "feedback",
                                      newFeedback
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Match the Following Question Type */}
                  {question.question_type === "match" && (
                    <div>
                      <h4>Match the Following</h4>
                      {updatedQuestions[question.id].options.map(
                        (opt, index) => (
                          <div key={index} style={{ marginBottom: "15px" }}>
                            <label>Left side:</label>
                            <textarea
                              value={opt.left}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "left",
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={20}
                            />

                            <label style={{ marginLeft: "10px" }}>
                              Right side:
                            </label>
                            <textarea
                              value={opt.right}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "right",
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={20}
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Correct Answer (Common for all types) */}
                  <div>
                    <label>Correct Answer:</label>
                    <input
                      type="text"
                      value={updatedQuestions[question.id].correct_answer}
                      onChange={(e) =>
                        handleQuestionChange(
                          question.id,
                          "correct_answer",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available for this module.</p>
          )}
        </div>

        <button onClick={handleSubmit} className="subbtn">
          Update Questions
        </button>
      </div>
    </>
  );
}

export default QuestionUpdate;
