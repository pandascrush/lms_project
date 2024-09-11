// import React, { useState } from 'react';

// function AdminCodingQuestion() {
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState('');
//   const [newAnswer, setNewAnswer] = useState('');

//   const handleQuestionChange = (e) => {
//     setNewQuestion(e.target.value);
//   };

//   const handleAnswerChange = (e) => {
//     setNewAnswer(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const question = {
//       question: newQuestion,
//       answer: newAnswer,
//     };
//     setQuestions([...questions, question]);
//     setNewQuestion('');
//     setNewAnswer('');
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Coding Question (Use `___` for blanks)</label>
//               <textarea
//                 className="form-control"
//                 value={newQuestion}
//                 onChange={handleQuestionChange}
//                 rows="4"
//                 required
//                 style={{ backgroundColor: 'black', color: 'white' }}
//               ></textarea>
//             </div>
//             <div className="form-group">
//               <label>Answer</label>
//               <textarea
//                 className="form-control"
//                 value={newAnswer}
//                 onChange={handleAnswerChange}
//                 rows="4"
//                 required
//               ></textarea>
//             </div>
//             <button type="submit" className="btn btn-primary">Add Question</button>
//           </form>
//           <div className="mt-4">
//             <h3>Questions List</h3>
//             <ul className="list-group">
//               {questions.map((question, index) => (
//                 <li key={index} className="list-group-item">
//                   <strong><pre style={{ whiteSpace: 'pre-wrap' }}>{question.question}</pre></strong>
//                   <pre style={{ whiteSpace: 'pre-wrap' }}>{question.answer}</pre>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminCodingQuestion;

import React, { useState } from 'react';
import axios from 'axios';
// import './CodeCompiler.css'; // Create a CSS file to style the component as needed

const languages = [
  { name: 'C', version: '5' },
  { name: 'C++', version: '5' },
  { name: 'Java', version: '10' },
  { name: 'Python', version: '3' },
  { name: 'JavaScript', version: '4' },
  { name: 'PHP', version: '8' },
  // Add other languages and versions supported by JDoodle or your chosen service
];

function AdminCodingQuestion() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState(languages[0].name);
  const [version, setVersion] = useState(languages[0].version);

  const handleLanguageChange = (e) => {
    const selectedLanguage = languages.find(lang => lang.name === e.target.value);
    setLanguage(selectedLanguage.name);
    setVersion(selectedLanguage.version);
  };

  const handleCompile = async () => {
    const clientId = 'YOUR_CLIENT_ID'; // Replace with your JDoodle client ID
    const clientSecret = 'YOUR_CLIENT_SECRET'; // Replace with your JDoodle client secret

    const program = {
      script: code,
      language: language.toLowerCase(),
      versionIndex: version,
      clientId: clientId,
      clientSecret: clientSecret
    };

    try {
      const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
      setOutput(response.data.output);
    } catch (error) {
      console.error('There was an error executing the code:', error);
      setOutput('Error executing code');
    }
  };

  return (
    <div className="compiler-container">
      <h2>Live Code Compiler</h2>
      <div className="controls">
        <select value={language} onChange={handleLanguageChange}>
          {languages.map(lang => (
            <option key={lang.name} value={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Write your code here..."
      />
      <button className="compile-button" onClick={handleCompile}>Compile and Run</button>
      <pre className="output">{output}</pre>
    </div>
  );
}

export default AdminCodingQuestion;

