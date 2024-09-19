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
    <div>
      <h2>Update Questions</h2>

      {/* Select Box for Modules */}
      <div>
        <label>Select Module:</label>
        <select value={selectedModuleId} onChange={handleModuleChange}>
          <option value="">--Select Module--</option>
          {modules.map((module) => (
            <option key={module.moduleid} value={module.moduleid}>
              {module.modulename}
            </option>
          ))}
        </select>
      </div>

      {/* Display Questions */}
      <div>
        <h3>Questions for Selected Module:</h3>
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

                {/* Display Options with Feedback */}
                <div>
                  <h4>Options</h4>
                  {updatedQuestions[question.id].options.map((opt, index) => (
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
                        onClick={() => toggleFeedbackEditor(question.id, index)}
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
                  ))}
                </div>

                {/* Correct Answer */}
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

      <button onClick={handleSubmit}>Update Questions</button>
    </div>
  );
}

export default QuestionUpdate;
