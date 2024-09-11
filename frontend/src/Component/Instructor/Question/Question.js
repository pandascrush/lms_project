// import React, { useState, useRef } from 'react';
// import JoditEditor from 'jodit-react';

// const Question = () => {
//   const [content, setContent] = useState(''); // State for question content
//   const [questionType, setQuestionType] = useState('multiple choice'); // State for question type
//   const [correctOption, setCorrectOption] = useState(''); // State for selected correct option
//   const [options, setOptions] = useState(['', '', '', '']); // State for multiple choice options
//   const [keywords, setKeywords] = useState([{ keyword: '', marks: '' }]); // State for keywords and marks
//   const editorRef = useRef(null);

//   // Handle editor content changes
//   const handleEditorChange = (newContent) => {
//     setContent(newContent);
//   };

//   // Handle button click to display editor content
//   const handleButtonClick = () => {
//     if (editorRef.current) {
//       const editorInstance = editorRef.current;
//       const currentContent = editorInstance.value;
//       setContent(currentContent);
//     }
//   };

//   // Handle dropdown change for question type
//   const handleQuestionTypeChange = (event) => {
//     setQuestionType(event.target.value);
//     setCorrectOption(''); // Reset correct option when changing question type
//   };

//   // Handle correct option selection change
//   const handleCorrectOptionChange = (e) => {
//     setCorrectOption(e.target.value);
//   };

//   // Handle input change for multiple choice options
//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   // Handle keyword and marks changes
//   const handleKeywordChange = (index, field, value) => {
//     const newKeywords = [...keywords];
//     newKeywords[index] = { ...newKeywords[index], [field]: value };
//     setKeywords(newKeywords);
//   };

//   // Add a new keyword input
//   const addKeyword = () => {
//     setKeywords([...keywords, { keyword: '', marks: '' }]);
//   };

//   // Remove a keyword input
//   const removeKeyword = (index) => {
//     setKeywords(keywords.filter((_, i) => i !== index));
//   };

//   return (

//     <div className="editor-container" style={{ textAlign: 'left' }}>
//       <div className="question-type-dropdown" style={{ marginBottom: '10px' }}>
//         <label htmlFor="questionType">Select Question Type:</label>
//         <select
//           id="questionType"
//           value={questionType}
//           onChange={handleQuestionTypeChange}
//           style={{ marginLeft: '10px' }}
//         >
//           <option value="multiple choice">Multiple Choice</option>
//           <option value="description">Description</option>
//           <option value="true/false">True/False</option>
//         </select>
//       </div>

//       {/* Question Input Area */}
//       <JoditEditor
//         ref={editorRef}
//         value={content}
//         config={{
//           readonly: false,
//           toolbar: true,
//         }}
//         onBlur={handleEditorChange} />

//       {/* Conditionally render True/False options */}
//       {questionType === 'true/false' && (
//         <div className="true-false-options" style={{ marginTop: '10px' }}>
//             <div className='d-flex justify-content-around'>
//           <div>
//             <label>
//               <input type="radio" name="trueFalseOption" value="true" disabled />
//               True
//             </label>
//           </div>
//           <div>
//             <label>
//               <input type="radio" name="trueFalseOption" value="false" disabled />
//               False
//             </label>
//           </div>
//           </div>
//           <div style={{ marginTop: '10px', marginBottom: '10px' }}>
//             <label>Correct Option:</label>
//             <select
//               value={correctOption}
//               onChange={handleCorrectOptionChange}
//               style={{ marginLeft: '10px' }}
//             >
//               <option value="">Select Correct Option</option>
//               <option value="true">True</option>
//               <option value="false">False</option>
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Conditionally render Multiple Choice inputs */}
//       {questionType === 'multiple choice' && (
//         <div style={{ marginTop: '10px' }}>
//           {options.map((option, index) => (
//             <div key={index} style={{ marginBottom: '10px' }}>
//               <label htmlFor={`option${index + 1}`}>Option {index + 1}:</label>
//               <input
//                 type="text"
//                 id={`option${index + 1}`}
//                 placeholder={`Option ${index + 1}`}
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 style={{ marginLeft: '10px' }}
//               />
//             </div>
//           ))}
//           <div style={{ marginBottom: '10px' }}>
//             <label>Correct Option:</label>
//             <select
//               value={correctOption}
//               onChange={handleCorrectOptionChange}
//               style={{ marginLeft: '10px' }}
//             >
//               <option value="">Select Correct Option</option>
//               {options.map((option, index) => (
//                 <option key={index} value={option}>
//                   Option {index + 1}: {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Conditionally render Description inputs */}
//       {questionType === 'description' && (
//         <div className="description" style={{ marginTop: '10px' }}>
//           {keywords.map((keyword, index) => (
//             <div key={index} style={{ marginBottom: '10px' }}>
//               <label htmlFor={`keyword${index}`}>Keyword {index + 1}:</label>
//               <input
//                 type="text"
//                 id={`keyword${index}`}
//                 placeholder="Enter the keyword"
//                 value={keyword.keyword}
//                 onChange={(e) => handleKeywordChange(index, 'keyword', e.target.value)}
//                 style={{ marginLeft: '10px' }}
//               />
//               <label htmlFor={`marks${index}`} style={{ marginLeft: '20px' }}>Marks:</label>
//               <input
//                 type="number"
//                 id={`marks${index}`}
//                 placeholder="Enter marks"
//                 value={keyword.marks}
//                 onChange={(e) => handleKeywordChange(index, 'marks', e.target.value)}
//                 style={{ marginLeft: '10px' }}
//               />
//               <button
//                 type="button"
//                 onClick={() => removeKeyword(index)}
//                 style={{ marginLeft: '10px' }}>
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={addKeyword} style={{ marginTop: '10px' }}>
//             Add Keyword
//           </button>
//         </div>
//       )}

//       <div style={{ marginTop: '20px' }}>
//         <button onClick={handleButtonClick}>Show Content</button>
//         <button type="submit" style={{ marginLeft: '10px' }}>
//           Submit
//         </button>
//         <h3>Editor Content:</h3>
//         <div
//           dangerouslySetInnerHTML={{ __html: content }}
//           style={{ border: '1px solid #ddd', padding: '10px', minHeight: '100px' }}/>
//       </div>
//     </div>
//   );
// };

// export default Question;

import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import * as XLSX from "xlsx";
import axios from "axios"; // Make sure axios is imported
import "./Question.css";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { FaUpload } from "react-icons/fa";

const Question = () => {
  const [content, setContent] = useState("");
  const [questionType, setQuestionType] = useState("multiple choice");
  const [correctOption, setCorrectOption] = useState("");
  const [options, setOptions] = useState([
    { option: "", feedback: "" },
    { option: "", feedback: "" },
    { option: "", feedback: "" },
    { option: "", feedback: "" },
  ]);
  const [showFeedback, setShowFeedback] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [keywords, setKeywords] = useState([{ keyword: "", marks: "" }]);
  const [uploadedQuestions, setUploadedQuestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [moduleStructure, setModuleStructure] = useState([]); // State to store fetched data
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [parentModuleId, setParentModuleId] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://192.168.252.191:5000/course/structured-data")
      .then((res) => {
        console.log(res.data);
        setModuleStructure(res.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to fetch courses!"); // Or use a toast if you prefer
      });
  }, []);

  const handleChange = (currentNode, selectedNodes) => {
    setSelected(selectedNodes);

    if (currentNode) {
      setSelectedModuleId(currentNode.value); // Use 'value' for module ID

      // Find the parent ID using the utility function
      const parentId = findParentNode(moduleStructure, currentNode.value);
      setParentModuleId(parentId);
    }

    if (currentNode && currentNode.label) {
      console.log(`Selected: ${currentNode.label}`);
    }

    console.log("Selected Nodes:", selectedNodes);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const findParentNode = (data, childValue) => {
    for (let node of data) {
      if (node.children && node.children.length > 0) {
        if (node.children.some((child) => child.value === childValue)) {
          return node.value; // Found the parent
        }
        const parent = findParentNode(node.children, childValue);
        if (parent) {
          return parent;
        }
      }
    }
    return null; // No parent found
  };

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
    setCorrectOption("");
  };

  const handleCorrectOptionChange = (e) => {
    setCorrectOption(e.target.value);
  };

  const toggleFeedback = (index) => {
    const newShowFeedback = [...showFeedback];
    newShowFeedback[index] = !newShowFeedback[index];
    setShowFeedback(newShowFeedback);
  };

  const handleKeywordChange = (index, field, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = { ...newKeywords[index], [field]: value };
    setKeywords(newKeywords);
  };

  const addKeyword = () => {
    setKeywords([...keywords, { keyword: "", marks: "" }]);
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setUploadedQuestions(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append form fields to the FormData object
    formData.append("content", content);
    formData.append("questionType", questionType);
    formData.append("correctOption", correctOption);
    formData.append("selectedModuleId", selectedModuleId);
    formData.append("parentModuleId", parentModuleId);

    // Append options array as JSON string
    formData.append("options", JSON.stringify(options));

    try {
      // Send the formData using axios
      const res = await axios.post(
        "http://192.168.252.191:5000/quiz/addquestion",
        formData
      );

      console.log(res.data);

      if (res.data.message === "quiz_added") {
        alert("Added successfully");

        // Clear all input and box values by resetting state
        setContent("");
        setQuestionType("multiple choice");
        setCorrectOption("");
        setOptions([
          { option: "", feedback: "" },
          { option: "", feedback: "" },
          { option: "", feedback: "" },
          { option: "", feedback: "" },
        ]);
        setShowFeedback([false, false, false, false]);
        setKeywords([{ keyword: "", marks: "" }]);
        setUploadedQuestions([]);
        setSelected([]);
        setSelectedModuleId(null);
        setParentModuleId(null);

        // Reset the JoditEditor content
        if (editorRef.current) {
          editorRef.current.editor.setValue(""); // Clear the editor content
        }
      } else if (res.data.error === "db_error") {
        console.log(res.data);
        // Handle DB error
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle error response
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="text-center">Quiz</h3>
      <div className="bgpurplecard p-5 rounded-3">
        <h5>Select the module</h5>
        <DropdownTreeSelect
          data={moduleStructure}
          onChange={handleChange}
          className="bootstrap-demo"
          texts={{ placeholder: "Select..." }}
        />
        <div
          className="question-type-dropdown d-flex justify-content-between my-3"
          style={{ marginBottom: "10px" }}
        >
          <div className="mx-2">
            <label htmlFor="questionType">
              <b>Select Question Type:</b>
            </label>
            <select
              id="questionType"
              value={questionType}
              onChange={handleQuestionTypeChange}
              style={{ marginLeft: "10px" }}
            >
              <option value="multiple choice">Multiple Choice</option>
              <option value="description">Description</option>
              <option value="true/false">True/False</option>
            </select>
          </div>
          <div className="mx-2">
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="border border-2"
            >
              <label
                htmlFor="file-upload"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                <FaUpload className="iconclr" />
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <span className="fw-bold">Upload File</span>
              </label>
            </div>
          </div>
        </div>

        <JoditEditor
          ref={editorRef}
          value={content}
          config={{
            readonly: false,
            toolbar: true,
          }}
          onBlur={handleEditorChange}
        />

        {questionType === "true/false" && (
          <div className="true-false-options" style={{ marginTop: "10px" }}>
            <div className="d-flex justify-content-around">
              <div>
                <label>
                  <input
                    type="radio"
                    name="trueFalseOption"
                    value="true"
                    disabled
                  />
                  True
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="trueFalseOption"
                    value="false"
                    disabled
                  />
                  False
                </label>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <label>Correct Option:</label>
              <select
                value={correctOption}
                onChange={handleCorrectOptionChange}
                style={{ marginLeft: "10px" }}
              >
                <option value="">Select Correct Option</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
        )}

        {questionType === "multiple choice" && (
          <div style={{ marginTop: "10px" }}>
            {options.map((optionObj, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <label htmlFor={`option${index + 1}`}>
                  Option {index + 1}:
                </label>
                <input
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`} // A, B, C, D
                  value={optionObj.option}
                  onChange={(e) =>
                    handleOptionChange(index, "option", e.target.value)
                  }
                />
                <button
                  className="m-3 feedbackbtn rounded-2"
                  onClick={() => toggleFeedback(index)}
                >
                  Add Feedback
                </button>
                {showFeedback[index] && (
                  <div className="feedback" style={{ marginTop: "10px" }}>
                    <label>Feedback for Option {index + 1}:</label>
                    <JoditEditor
                      value={optionObj.feedback}
                      config={{
                        readonly: false,
                        toolbar: true,
                      }}
                      onBlur={(newContent) =>
                        handleOptionChange(index, "feedback", newContent)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <label>Select Correct Option</label> &nbsp;
              <select
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
              >
                <option>Select Correct Option</option>
                {options.map(
                  (option, index) =>
                    option.option.trim() && (
                      <option key={index} value={option.option}>
                        {option.option}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
        )}

        {questionType === "description" && (
          <div style={{ marginTop: "20px" }}>
            <h5>Keywords</h5>
            {keywords.map((keyword, index) => (
              <div key={index}>
                <label>Keyword {index + 1}:</label>
                <input
                  type="text"
                  value={keyword.keyword}
                  onChange={(e) =>
                    handleKeywordChange(index, "keyword", e.target.value)
                  }
                  style={{ marginLeft: "10px" }}
                />
                <label style={{ marginLeft: "20px" }}>Marks:</label>
                <input
                  type="number"
                  value={keyword.marks}
                  onChange={(e) =>
                    handleKeywordChange(index, "marks", e.target.value)
                  }
                  style={{ marginLeft: "10px" }}
                />
                <button
                  className="m-3 feedbackbtn rounded-2"
                  onClick={() => removeKeyword(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button className="m-3 feedbackbtn rounded-2" onClick={addKeyword}>
              Add Keyword
            </button>
          </div>
        )}

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary btn-lg"
            style={{ marginTop: "20px" }}
            onClick={handleSubmit}
          >
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
