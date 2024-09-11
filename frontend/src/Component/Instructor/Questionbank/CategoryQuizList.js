// import React, { useState, useEffect } from 'react';
// import quizData from './quizData.json';
// import "./CategoryQuizList.css";

// const CategoryQuizList = () => {
//   const [categories, setCategories] = useState([]);
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedQuizzes, setSelectedQuizzes] = useState({});
//   const [addedQuizzes, setAddedQuizzes] = useState([]);
//   const [marks, setMarks] = useState({});
//   const [headerMarks, setHeaderMarks] = useState('');
//   const [maxRandomValue, setMaxRandomValue] = useState('');
//   const [viewType, setViewType] = useState('Sequential');

//   useEffect(() => {
//     const uniqueCategories = Array.from(new Set(quizData.map(item => item.Category)));
//     setCategories(uniqueCategories);
//     setQuizzes(quizData);
//   }, []);

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleCheckboxChange = (quizId) => {
//     setSelectedQuizzes(prev => {
//       const updated = { ...prev };
//       if (updated[quizId]) {
//         delete updated[quizId];
//         setMarks(prevMarks => {
//           const updatedMarks = { ...prevMarks };
//           delete updatedMarks[quizId];
//           return updatedMarks;
//         });
//       } else {
//         updated[quizId] = true;
//         setMarks(prevMarks => ({
//           ...prevMarks,
//           [quizId]: headerMarks // Set headerMarks for new selection
//         }));
//       }
//       return updated;
//     });
//   };

//   const handleMarksChange = (quizId, value) => {
//     setMarks(prevMarks => ({
//       ...prevMarks,
//       [quizId]: value
//     }));
//   };

//   const handleHeaderMarksChange = (event) => {
//     const value = event.target.value;
//     setHeaderMarks(value);
//     setMarks(prevMarks => {
//       const updatedMarks = { ...prevMarks };
//       Object.keys(selectedQuizzes).forEach(quizId => {
//         if (selectedQuizzes[quizId]) {
//           updatedMarks[quizId] = value;
//         }
//       });
//       return updatedMarks;
//     });
//   };

//   const handleAddQuizzes = () => {
//     const selectedQuizList = quizzes.filter(quiz => selectedQuizzes[quiz['Quiz ID']]);
//     const updatedQuizList = selectedQuizList.map(quiz => ({
//       ...quiz,
//       Marks: marks[quiz['Quiz ID']] || ''
//     }));
//     setAddedQuizzes(prev => [...prev, ...updatedQuizList]);
//     setSelectedQuizzes({});
//     setMarks({});
//   };

//   const handleMaxRandomValueChange = (event) => {
//     const value = Number(event.target.value);
//     const numberOfBoxes = Object.keys(selectedQuizzes).length;
//     if (value >= 0 && value <= numberOfBoxes) {
//       setMaxRandomValue(value);
//     }
//     // else {
//     //   alert('Value must be between 0 and the number of selected quizzes.');
//     // }
//   };

//   const handleViewTypeChange = (type) => {
//     setViewType(type);
//     if (type === 'Random') {
//       handleMaxRandomValueChange({ target: { value: maxRandomValue } }); // Ensure value is valid
//     }
//   };

//   const filteredQuizzes = quizzes.filter(quiz => quiz.Category === selectedCategory);

//   return (
//     <div className='container-fluid'>
//       <h3 className='text-center my-2'>Question Bank</h3>
//       <div className='bgpurplecard m-4 p-3 rounded-2'>
//         <div style={{ marginBottom: '20px' }}>
//           <h5>Categories</h5>
//           <select
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//             style={{ width: '50%', padding: '10px' }}
//           >
//             <option value="">Select a category</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedCategory && (
//           <div style={{ marginTop: '20px' }}>
//             <h5>Quizzes</h5>
//             <table className='table'>
//               <thead>
//                 <tr className='bghead'>
//                   <th>Select</th>
//                   <th>Question ID</th>
//                   <th>Question Text</th>
//                   <th>Usage Frequency</th>
//                   <th>
//                     Marks
//                     <input
//                       type="number"
//                       min="0"
//                       placeholder="Set Mark"
//                       value={headerMarks}
//                       onChange={handleHeaderMarksChange}
//                       style={{ marginLeft: '10px', width: '100px' }}
//                     />
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredQuizzes.map((quiz, index) => (
//                   <tr key={index}>
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={!!selectedQuizzes[quiz['Quiz ID']]}
//                         onChange={() => handleCheckboxChange(quiz['Quiz ID'])}
//                       />
//                     </td>
//                     <td>{quiz['Quiz ID']}</td>
//                     <td>{quiz.Question}</td>
//                     <td>{quiz['Usage Frequency'] || 'N/A'}</td>
//                     <td>
//                       <input
//                         type="number"
//                         min="0"
//                         value={marks[quiz['Quiz ID']] || ''}
//                         onChange={(e) => handleMarksChange(quiz['Quiz ID'], e.target.value)}
//                         disabled={!selectedQuizzes[quiz['Quiz ID']]}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className='my-2'>
//               <label>Set Time</label>
//               <input type='number' min="0"/><br/>
//               <h5 className='my-2'>Question View Type</h5>
//               <input
//                 type='radio'
//                 name='viewType'
//                 className='me-3 ms-1'
//                 checked={viewType === 'Sequential'}
//                 onChange={() => handleViewTypeChange('Sequential')}
//               />
//               <label className="custom-radio">Sequential</label>
//               <input
//                 type='radio'
//                 name='viewType'
//                 className='mx-3'
//                 checked={viewType === 'Random'}
//                 onChange={() => handleViewTypeChange('Random')}
//               />
//               <label>Random</label>
//             </div>

//             {viewType === 'Random' && (
//               <div>
//                 <label>Max Number of Random Inputs</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={maxRandomValue}
//                   onChange={handleMaxRandomValueChange}
//                 />
//                 {/* {Array.from({ length: Number(maxRandomValue) }, (_, index) => (
//                   <div key={index}>
//                     <label>Input {index}</label>
//                     <input type="number" min="0" />
//                   </div>
//                 ))} */}
//               </div>
//             )}

//             <button onClick={handleAddQuizzes} style={{ marginTop: '20px' }} className='rounded-3'>
//               Add Selected Quizzes
//             </button>
//           </div>
//         )}

//         <div style={{ marginTop: '20px' }}>
//           <h5>Added Quizzes</h5>
//           <ol>
//             {addedQuizzes.map((quiz, index) => (
//               <li key={index} style={{ marginBottom: '10px' }}>
//                 <div><strong>Question:</strong> {quiz.Question}</div>
//                 <div><strong>Marks:</strong> {quiz.Marks}</div>
//                 <div><strong>Options:</strong></div>
//                 <ol>
//                   {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, idx) => (
//                     <li key={idx} type="A">
//                       <input type="checkbox" disabled />
//                       {quiz[option]}
//                     </li>
//                   ))}
//                 </ol>
//                 <div><strong>Correct Option:</strong> {quiz['Correct Option']}</div>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryQuizList;

// import React, { useState, useEffect } from 'react';
// import quizData from './quizData.json';
// import "./CategoryQuizList.css";

// const CategoryQuizList = () => {
//   const [categories, setCategories] = useState([]);
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedQuizzes, setSelectedQuizzes] = useState({});
//   const [addedQuizzes, setAddedQuizzes] = useState([]);
//   const [marks, setMarks] = useState({});
//   const [headerMarks, setHeaderMarks] = useState('');
//   const [maxRandomValue, setMaxRandomValue] = useState('');
//   const [viewType, setViewType] = useState('Sequential');

//   useEffect(() => {
//     const uniqueCategories = Array.from(new Set(quizData.map(item => item.Category)));
//     setCategories(uniqueCategories);
//     setQuizzes(quizData);
//   }, []);

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleCheckboxChange = (quizId) => {
//     setSelectedQuizzes(prev => {
//       const updated = { ...prev };
//       if (updated[quizId]) {
//         delete updated[quizId];
//         setMarks(prevMarks => {
//           const updatedMarks = { ...prevMarks };
//           delete updatedMarks[quizId];
//           return updatedMarks;
//         });
//       } else {
//         updated[quizId] = true;
//         setMarks(prevMarks => ({
//           ...prevMarks,
//           [quizId]: headerMarks // Set headerMarks for new selection
//         }));
//       }
//       return updated;
//     });
//   };

//   const handleMarksChange = (quizId, value) => {
//     setMarks(prevMarks => ({
//       ...prevMarks,
//       [quizId]: value
//     }));
//   };

//   const handleHeaderMarksChange = (event) => {
//     const value = event.target.value;
//     setHeaderMarks(value);
//     setMarks(prevMarks => {
//       const updatedMarks = { ...prevMarks };
//       Object.keys(selectedQuizzes).forEach(quizId => {
//         if (selectedQuizzes[quizId]) {
//           updatedMarks[quizId] = value;
//         }
//       });
//       return updatedMarks;
//     });
//   };

//   const handleAddQuizzes = () => {
//     const selectedQuizList = quizzes.filter(quiz => selectedQuizzes[quiz['Quiz ID']]);
//     const updatedQuizList = selectedQuizList.map(quiz => ({
//       ...quiz,
//       Marks: marks[quiz['Quiz ID']] || ''
//     }));
//     setAddedQuizzes(prev => [...prev, ...updatedQuizList]);
//     setSelectedQuizzes({});
//     setMarks({});
//   };

//   const handleMaxRandomValueChange = (event) => {
//     const value = Number(event.target.value);
//     const numberOfBoxes = Object.keys(selectedQuizzes).length;
//     if (value >= 0 && value <= numberOfBoxes) {
//       setMaxRandomValue(value);
//     }
//   };

//   const handleViewTypeChange = (type) => {
//     setViewType(type);
//     if (type === 'Random') {
//       handleMaxRandomValueChange({ target: { value: maxRandomValue } }); // Ensure value is valid
//     }
//   };

//   const filteredQuizzes = quizzes.filter(quiz => quiz.Category === selectedCategory);

//   return (
//     <div className='container-fluid'>
//       <h3 className='text-center my-2'>Quiz</h3>
//       <div className='bgpurplecard m-4 p-3 rounded-2'>
//         <div style={{ marginBottom: '20px' }}>
// <div>
//           <h5>Categories</h5>
//           <select
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//             style={{ width: '50%', padding: '10px' }}
//           >
//             <option value="">Select a category</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           </div>
//           <div>
//           <h5 className='my-2'>Question View Type</h5>
//               <label className="custom-radio mx-2">
//                 <input
//                   type='radio'
//                   name='viewType'
//                   checked={viewType === 'Sequential'}
//                   onChange={() => handleViewTypeChange('Sequential')}
//                 />
//                 Sequential
//               </label>
//               <label className="custom-radio mx-2">
//                 <input
//                   type='radio'
//                   name='viewType'
//                   checked={viewType === 'Random'}
//                   onChange={() => handleViewTypeChange('Random')}
//                 />
//                 Random
//               </label>
//         </div>
//         </div>
//         {selectedCategory && (
//           <div style={{ marginTop: '20px' }}>
//             <h5>Quizzes</h5>
//             <table className='table'>
//               <thead>
//                 <tr className='bghead'>
//                   <th>Select</th>
//                   <th>Question ID</th>
//                   <th>Question Text</th>
//                   <th>Usage Frequency</th>
//                   <th>
//                     Marks
//                     <input
//                       type="number"
//                       min="0"
//                       placeholder="Set Mark"
//                       value={headerMarks}
//                       onChange={handleHeaderMarksChange}
//                       style={{ marginLeft: '10px', width: '100px' }}
//                     />
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredQuizzes.map((quiz, index) => (
//                   <tr key={index}>
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={!!selectedQuizzes[quiz['Quiz ID']]}
//                         onChange={() => handleCheckboxChange(quiz['Quiz ID'])}
//                       />
//                     </td>
//                     <td>{quiz['Quiz ID']}</td>
//                     <td>{quiz.Question}</td>
//                     <td>{quiz['Usage Frequency'] || 'N/A'}</td>
//                     <td>
//                       <input
//                         type="number"
//                         min="0"
//                         value={marks[quiz['Quiz ID']] || ''}
//                         onChange={(e) => handleMarksChange(quiz['Quiz ID'], e.target.value)}
//                         disabled={!selectedQuizzes[quiz['Quiz ID']]}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className='m-2'>
//               <label className='m-2'>Set Time</label>

//               <input type='number' min="0" className='border-0'/><br/>
//               {/* <h5 className='my-2'>Question View Type</h5>
//               <label className="custom-radio mx-2">
//                 <input
//                   type='radio'
//                   name='viewType'
//                   checked={viewType === 'Sequential'}
//                   onChange={() => handleViewTypeChange('Sequential')}
//                 />
//                 Sequential
//               </label>
//               <label className="custom-radio mx-2">
//                 <input
//                   type='radio'
//                   name='viewType'
//                   checked={viewType === 'Random'}
//                   onChange={() => handleViewTypeChange('Random')}
//                 />
//                 Random
//               </label> */}
//             </div>

//             {viewType === 'Random' && (
//               <div>
//                 <label>Max Number of Random Inputs</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={maxRandomValue}
//                   onChange={handleMaxRandomValueChange}
//                 />
//               </div>
//             )}

//             <button onClick={handleAddQuizzes} style={{ marginTop: '20px' }} className='rounded-3'>
//               Add Selected Quizzes
//             </button>
//           </div>
//         )}

//         <div style={{ marginTop: '20px' }}>
//           {/* <h5>Added Quizzes</h5>                                               */}
//           {/* <ol>
//             {addedQuizzes.map((quiz, index) => (
//               <li key={index} style={{ marginBottom: '10px' }}>
//                 <div><strong>Question:</strong> {quiz.Question}</div>
//                 <div><strong>Marks:</strong> {quiz.Marks}</div>
//                 <div><strong>Options:</strong></div>
//                 <ol>
//                   {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, idx) => (
//                     <li key={idx} type="A">
//                       <input type="checkbox" disabled />
//                       {quiz[option]}
//                     </li>
//                   ))}
//                 </ol>
//                 <div><strong>Correct Option:</strong> {quiz['Correct Option']}</div>
//               </li>
//             ))}
//           </ol> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryQuizList;

// // import React, { useState, useEffect } from 'react';
// // import quizData from './quizData.json';
// // import "./CategoryQuizList.css";

// // const CategoryQuizList = () => {
// //   const [categories, setCategories] = useState([]);
// //   const [quizzes, setQuizzes] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState('');
// //   const [selectedQuizzes, setSelectedQuizzes] = useState({});
// //   const [addedQuizzes, setAddedQuizzes] = useState([]);
// //   const [marks, setMarks] = useState({});
// //   const [headerMarks, setHeaderMarks] = useState('');
// //   const [maxRandomValue, setMaxRandomValue] = useState('');
// //   const [viewType, setViewType] = useState('Sequential');

// //   useEffect(() => {
// //     const uniqueCategories = Array.from(new Set(quizData.map(item => item.Category)));
// //     setCategories(uniqueCategories);
// //     setQuizzes(quizData);
// //   }, []);

// //   const handleCategoryChange = (event) => {
// //     setSelectedCategory(event.target.value);
// //   };

// //   const handleCheckboxChange = (quizId) => {
// //     setSelectedQuizzes(prev => {
// //       const updated = { ...prev };
// //       if (updated[quizId]) {
// //         delete updated[quizId];
// //         setMarks(prevMarks => {
// //           const updatedMarks = { ...prevMarks };
// //           delete updatedMarks[quizId];
// //           return updatedMarks;
// //         });
// //       } else {
// //         updated[quizId] = true;
// //         setMarks(prevMarks => ({
// //           ...prevMarks,
// //           [quizId]: headerMarks // Set headerMarks for new selection
// //         }));
// //       }
// //       return updated;
// //     });
// //   };

// //   const handleMarksChange = (quizId, value) => {
// //     setMarks(prevMarks => ({
// //       ...prevMarks,
// //       [quizId]: value
// //     }));
// //   };

// //   const handleHeaderMarksChange = (event) => {
// //     const value = event.target.value;
// //     setHeaderMarks(value);
// //     setMarks(prevMarks => {
// //       const updatedMarks = { ...prevMarks };
// //       Object.keys(selectedQuizzes).forEach(quizId => {
// //         if (selectedQuizzes[quizId]) {
// //           updatedMarks[quizId] = value;
// //         }
// //       });
// //       return updatedMarks;
// //     });
// //   };

// //   const handleAddQuizzes = () => {
// //     const selectedQuizList = quizzes.filter(quiz => selectedQuizzes[quiz['Quiz ID']]);
// //     const updatedQuizList = selectedQuizList.map(quiz => ({
// //       ...quiz,
// //       Marks: marks[quiz['Quiz ID']] || ''
// //     }));
// //     setAddedQuizzes(prev => [...prev, ...updatedQuizList]);
// //     setSelectedQuizzes({});
// //     setMarks({});
// //   };

// //   const handleMaxRandomValueChange = (event) => {
// //     const value = Number(event.target.value);
// //     const numberOfBoxes = Object.keys(selectedQuizzes).length;
// //     if (value >= 0 && value <= numberOfBoxes) {
// //       setMaxRandomValue(value);
// //     }
// //   };

// //   const handleViewTypeChange = (type) => {
// //     setViewType(type);
// //     if (type === 'Random') {
// //       handleMaxRandomValueChange({ target: { value: maxRandomValue } }); // Ensure value is valid
// //     }
// //   };

// //   const filteredQuizzes = quizzes.filter(quiz => quiz.Category === selectedCategory);

// //   return (
// //     <div className='container-fluid'>
// //       <h3 className='text-center my-2'>Quiz</h3>
// //       <div className='bgpurplecard m-4 p-3 rounded-2'>
// //         <div style={{ marginBottom: '20px' }}>
// // <div>
// //           <h5>Categories</h5>
// //           <select
// //             value={selectedCategory}
// //             onChange={handleCategoryChange}
// //             style={{ width: '50%', padding: '10px' }}
// //           >
// //             <option value="">Select a category</option>
// //             {categories.map((category, index) => (
// //               <option key={index} value={category}>
// //                 {category}
// //               </option>
// //             ))}
// //           </select>
// //           </div>
// //           <div>
// //           <h5 className='my-2'>Question View Type</h5>
// //               <label className="custom-radio mx-2">
// //                 <input
// //                   type='radio'
// //                   name='viewType'
// //                   checked={viewType === 'Sequential'}
// //                   onChange={() => handleViewTypeChange('Sequential')}
// //                 />
// //                 Sequential
// //               </label>
// //               <label className="custom-radio mx-2">
// //                 <input
// //                   type='radio'
// //                   name='viewType'
// //                   checked={viewType === 'Random'}
// //                   onChange={() => handleViewTypeChange('Random')}
// //                 />
// //                 Random
// //               </label>
// //         </div>
// //         </div>
// //         {selectedCategory && (
// //           <div style={{ marginTop: '20px' }}>
// //             <h5>Quizzes</h5>
// //             <table className='table'>
// //               <thead>
// //                 <tr className='bghead'>
// //                   <th>Select</th>
// //                   <th>Question ID</th>
// //                   <th>Question Text</th>
// //                   <th>Usage Frequency</th>
// //                   <th>
// //                     Marks
// //                     <input
// //                       type="number"
// //                       min="0"
// //                       placeholder="Set Mark"
// //                       value={headerMarks}
// //                       onChange={handleHeaderMarksChange}
// //                       style={{ marginLeft: '10px', width: '100px' }}
// //                     />
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredQuizzes.map((quiz, index) => (
// //                   <tr key={index}>
// //                     <td>
// //                       <input
// //                         type="checkbox"
// //                         checked={!!selectedQuizzes[quiz['Quiz ID']]}
// //                         onChange={() => handleCheckboxChange(quiz['Quiz ID'])}
// //                       />
// //                     </td>
// //                     <td>{quiz['Quiz ID']}</td>
// //                     <td>{quiz.Question}</td>
// //                     <td>{quiz['Usage Frequency'] || 'N/A'}</td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         min="0"
// //                         value={marks[quiz['Quiz ID']] || ''}
// //                         onChange={(e) => handleMarksChange(quiz['Quiz ID'], e.target.value)}
// //                         disabled={!selectedQuizzes[quiz['Quiz ID']]}
// //                       />
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>

// //             <div className='m-2'>
// //               <label className='m-2'>Set Time</label>

// //               <input type='number' min="0" className='border-0'/><br/>
// //               {/* <h5 className='my-2'>Question View Type</h5>
// //               <label className="custom-radio mx-2">
// //                 <input
// //                   type='radio'
// //                   name='viewType'
// //                   checked={viewType === 'Sequential'}
// //                   onChange={() => handleViewTypeChange('Sequential')}
// //                 />
// //                 Sequential
// //               </label>
// //               <label className="custom-radio mx-2">
// //                 <input
// //                   type='radio'
// //                   name='viewType'
// //                   checked={viewType === 'Random'}
// //                   onChange={() => handleViewTypeChange('Random')}
// //                 />
// //                 Random
// //               </label> */}
// //             </div>

// //             {viewType === 'Random' && (
// //               <div>
// //                 <label>Max Number of Random Inputs</label>
// //                 <input
// //                   type="number"
// //                   min="0"
// //                   value={maxRandomValue}
// //                   onChange={handleMaxRandomValueChange}
// //                 />
// //               </div>
// //             )}

// //             <button onClick={handleAddQuizzes} style={{ marginTop: '20px' }} className='rounded-3'>
// //               Add Selected Quizzes
// //             </button>
// //           </div>
// //         )}

// //         <div style={{ marginTop: '20px' }}>
// //           {/* <h5>Added Quizzes</h5>                                               */}
// //           {/* <ol>
// //             {addedQuizzes.map((quiz, index) => (
// //               <li key={index} style={{ marginBottom: '10px' }}>
// //                 <div><strong>Question:</strong> {quiz.Question}</div>
// //                 <div><strong>Marks:</strong> {quiz.Marks}</div>
// //                 <div><strong>Options:</strong></div>
// //                 <ol>
// //                   {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, idx) => (
// //                     <li key={idx} type="A">
// //                       <input type="checkbox" disabled />
// //                       {quiz[option]}
// //                     </li>
// //                   ))}
// //                 </ol>
// //                 <div><strong>Correct Option:</strong> {quiz['Correct Option']}</div>
// //               </li>
// //             ))}
// //           </ol> */}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CategoryQuizList;

// import React, { useState, useEffect } from 'react';
// import quizData from './quizData.json';
// import "./CategoryQuizList.css";

// const CategoryQuizList = () => {
//   const [categories, setCategories] = useState([]);
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedQuizzes, setSelectedQuizzes] = useState({});
//   const [addedQuizzes, setAddedQuizzes] = useState([]);
//   const [marks, setMarks] = useState({});
//   const [headerMarks, setHeaderMarks] = useState('');
//   const [maxRandomValue, setMaxRandomValue] = useState('');
//   const [viewType, setViewType] = useState('Sequential');

//   useEffect(() => {
//     const uniqueCategories = Array.from(new Set(quizData.map(item => item.Category)));
//     setCategories(uniqueCategories);
//     setQuizzes(quizData);
//   }, []);

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleCheckboxChange = (quizId) => {
//     setSelectedQuizzes(prev => {
//       const updated = { ...prev };
//       if (updated[quizId]) {
//         delete updated[quizId];
//         setMarks(prevMarks => {
//           const updatedMarks = { ...prevMarks };
//           delete updatedMarks[quizId];
//           return updatedMarks;
//         });
//       } else {
//         updated[quizId] = true;
//         setMarks(prevMarks => ({
//           ...prevMarks,
//           [quizId]: headerMarks // Set headerMarks for new selection
//         }));
//       }
//       return updated;
//     });
//   };

//   const handleMarksChange = (quizId, value) => {
//     setMarks(prevMarks => ({
//       ...prevMarks,
//       [quizId]: value
//     }));
//   };

//   const handleHeaderMarksChange = (event) => {
//     const value = event.target.value;
//     setHeaderMarks(value);
//     setMarks(prevMarks => {
//       const updatedMarks = { ...prevMarks };
//       Object.keys(selectedQuizzes).forEach(quizId => {
//         if (selectedQuizzes[quizId]) {
//           updatedMarks[quizId] = value;
//         }
//       });
//       return updatedMarks;
//     });
//   };

//   const handleAddQuizzes = () => {
//     const selectedQuizList = quizzes.filter(quiz => selectedQuizzes[quiz['Quiz ID']]);
//     const updatedQuizList = selectedQuizList.map(quiz => ({
//       ...quiz,
//       Marks: marks[quiz['Quiz ID']] || ''
//     }));
//     setAddedQuizzes(prev => [...prev, ...updatedQuizList]);
//     setSelectedQuizzes({});
//     setMarks({});
//   };

//   const handleMaxRandomValueChange = (event) => {
//     const value = Number(event.target.value);
//     const numberOfBoxes = Object.keys(selectedQuizzes).length;
//     if (value >= 0 && value <= numberOfBoxes) {
//       setMaxRandomValue(value);
//     }
//   };

//   const handleViewTypeChange = (type) => {
//     setViewType(type);
//     if (type === 'Random') {
//       handleMaxRandomValueChange({ target: { value: maxRandomValue } }); // Ensure value is valid
//     }
//   };

//   const filteredQuizzes = quizzes.filter(quiz => quiz.Category === selectedCategory);

//   return (
//     <div className='container-fluid'>
//       <h3 className='text-center my-2'>Quiz</h3>
//       <div className='bgpurplecard m-4 p-3 rounded-2'>
//         {/* Flex container for category and question type */}
//         <div className='d-flex flex-wrap align-items-center mb-4'>
//           <div>
//             <h5>Categories</h5>
//             <select
//               value={selectedCategory}
//               onChange={handleCategoryChange}
//               className='form-select'
//               style={{ minWidth: '200px' }}
//             >
//               <option value="">Select a category</option>
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <h5>Question View Type</h5>
//             <label className="custom-radio mx-2">
//               <input
//                 type='radio'
//                 name='viewType'
//                 checked={viewType === 'Sequential'}
//                 onChange={() => handleViewTypeChange('Sequential')}
//               />
//               Sequential
//             </label>
//             <label className="custom-radio mx-2">
//               <input
//                 type='radio'
//                 name='viewType'
//                 checked={viewType === 'Random'}
//                 onChange={() => handleViewTypeChange('Random')}
//               />
//               Random
//             </label>
//           </div>
//         </div>

//         {/* Other components remain unchanged */}

//         {/* Add your remaining component logic here... */}

//       </div>
//     </div>
//   );
// };

// export default CategoryQuizList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import "./CategoryQuizList.css";

const CategoryQuizList = () => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedQuizzes, setSelectedQuizzes] = useState({});
  const [addedQuizzes, setAddedQuizzes] = useState([]);
  const [marks, setMarks] = useState({});
  const [headerMarks, setHeaderMarks] = useState("");
  const [maxRandomValue, setMaxRandomValue] = useState(0);
  const [viewType, setViewType] = useState("Sequential");
  const [randomQuizzes, setRandomQuizzes] = useState([]);
  const [shuffledQuizzes, setShuffledQuizzes] = useState([]);
  const [selectedQuizType, setSelectedQuizType] = useState("");
  const [quizTypes, setQuizTypes] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    axios.get(`http://192.168.252.191:5000/course/getmodule`).then((res) => {
      const { data } = res;
      setCategories(data.result);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://192.168.252.191:5000/quiz/getquiztype`).then((res) => {
      setQuizTypes(res.data.result);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedCourseId) {
      // Fetch quizzes based on selected courseId and moduleId
      axios
        .get(
          `http://192.168.252.191:5000/quiz/questions/${selectedCourseId}/${selectedCategory}`
        )
        .then((res) => {
          console.log(res.data);
          setQuizzes(res.data);
          // Update maxRandomValue to reflect the number of quizzes
          setMaxRandomValue(res.data.length);
        })
        .catch((error) => {
          console.error("Error fetching quizzes:", error);
        });
    }
  }, [selectedCategory, selectedCourseId]);

  const handleCategoryChange = (event) => {
    const selectedModuleId = event.target.value;
    const selectedModule = categories.find(
      (category) => category.moduleid === parseInt(selectedModuleId)
    );

    if (selectedModule) {
      setSelectedCategory(selectedModule.moduleid);
      setSelectedCourseId(selectedModule.courseid);
    }
  };

  const handleCheckboxChange = (quizId) => {
    setSelectedQuizzes((prev) => {
      const updated = { ...prev };
      if (updated[quizId]) {
        delete updated[quizId];
        setMarks((prevMarks) => {
          const updatedMarks = { ...prevMarks };
          delete updatedMarks[quizId];
          return updatedMarks;
        });
      } else {
        updated[quizId] = true;
        setMarks((prevMarks) => ({
          ...prevMarks,
          [quizId]: headerMarks,
        }));
      }
      return updated;
    });
  };

  const handleMarksChange = (quizId, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [quizId]: value,
    }));
  };

  const handleHeaderMarksChange = (event) => {
    const value = event.target.value;
    setHeaderMarks(value);
    setMarks((prevMarks) => {
      const updatedMarks = { ...prevMarks };
      Object.keys(selectedQuizzes).forEach((quizId) => {
        if (selectedQuizzes[quizId]) {
          updatedMarks[quizId] = value;
        }
      });
      return updatedMarks;
    });
  };

  const handleAddQuizzes = () => {
    let selectedQuizList;
    let sequence;

    if (viewType === "Sequential") {
      selectedQuizList = quizzes.filter((quiz) => selectedQuizzes[quiz.id]);
      sequence = 1; // Sequential view
    } else {
      selectedQuizList = randomQuizzes;
      sequence = 2; // Random view
    }

    const updatedQuizList = selectedQuizList.map((quiz) => ({
      ...quiz,
      Marks: marks[quiz.id] || "",
    }));

    setAddedQuizzes((prev) => [...prev, ...updatedQuizList]);
    setSelectedQuizzes({});
    setMarks({});

    const questionIds = selectedQuizList.map((quiz) => quiz.id);
    const marksForQuizzes = selectedQuizList.map(
      (quiz) => marks[quiz.id] || ""
    );

    // Send the data to the backend
    axios
      .post("http://192.168.252.191:5000/quiz/createquiz", {
        courseId: selectedCourseId,
        categoryId: selectedCategory,
        questionCount: selectedQuizList.length,
        questionIds: questionIds,
        marks: marksForQuizzes,
        sequence, // Send sequence value to the backend
        quizTypeId: selectedQuizType, // Send selected quiz type ID
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Quizzes submitted successfully.") {
          alert("Quizzes submitted successfully.");
        } else if (response.data.message === "Invalid data received.") {
          alert("Invalid data received.");
        } else if (response.data.message === "Error saving quizzes.") {
          alert("Error saving quizzes.");
        }
      })
      .catch((error) => {
        console.error("Error submitting quizzes:", error);
      });
  };

  const handleMaxRandomValueChange = (event) => {
    const value = Number(event.target.value);
    const numberOfQuizzes = quizzes.length; // Total number of quizzes
    if (value >= 0 && value <= numberOfQuizzes) {
      setMaxRandomValue(value);
      setRandomQuizzes(getRandomQuizzes(value)); // Update random quizzes based on selected value
    }
  };

  const handleViewTypeChange = (type) => {
    setViewType(type);
    if (type === "Random") {
      setRandomQuizzes(getRandomQuizzes(maxRandomValue));
    }
  };

  const getRandomQuizzes = (count) => {
    const shuffled = [...quizzes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count); // Return only the selected number of random quizzes
  };

  const shuffleSelectedQuizzes = () => {
    const selectedQuizIds = Object.keys(selectedQuizzes).filter(
      (id) => selectedQuizzes[id]
    );
    const selectedQuizList = quizzes.filter((quiz) =>
      selectedQuizIds.includes(quiz.id.toString())
    );
    const shuffled = selectedQuizList.sort(() => 0.5 - Math.random());
    setShuffledQuizzes(shuffled);
  };

  useEffect(() => {
    if (viewType === "Random") {
      setRandomQuizzes(getRandomQuizzes(maxRandomValue));
    }
  }, [maxRandomValue, quizzes, viewType]);

  return (
    <div className="container-fluid">
      <h3 className="text-center my-2">Quiz</h3>
      <div className="bgpurplecard m-4 p-3 rounded-2">
        <div style={{ marginBottom: "20px" }}>
          <div>
            <h5>Categories</h5>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{ width: "50%", padding: "10px" }}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.moduleid} value={category.moduleid}>
                  {category.modulename}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5 className="my-2">Quiz Type</h5>
            <select
              value={selectedQuizType}
              onChange={(e) => setSelectedQuizType(e.target.value)}
              style={{ width: "50%", padding: "10px" }}
            >
              <option value="">Select a quiz type</option>
              {quizTypes.map((quizType) => (
                <option
                  key={quizType.quiz_type_id}
                  value={quizType.quiz_type_id}
                >
                  {quizType.quiz_type_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5 className="my-2">Question View Type</h5>
            <label className="custom-radio mx-2">
              <input
                type="radio"
                name="viewType"
                checked={viewType === "Sequential"}
                onChange={() => handleViewTypeChange("Sequential")}
              />
              Sequential
            </label>
            <label className="custom-radio mx-2">
              <input
                type="radio"
                name="viewType"
                checked={viewType === "Random"}
                onChange={() => handleViewTypeChange("Random")}
              />
              Random
            </label>
            {viewType === "Random" && (
              <div className="max-random-container my-2">
                <label>
                  Max Random Value:
                  <input
                    type="number"
                    min="0"
                    max={quizzes.length}
                    value={maxRandomValue}
                    onChange={handleMaxRandomValueChange}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between my-3">
            <div>
              <h5>Marks</h5>
              <input
                type="number"
                placeholder="Enter Marks"
                value={headerMarks}
                onChange={handleHeaderMarksChange}
              />
            </div>
            {viewType === "Sequential" &&
              Object.keys(selectedQuizzes).length > 0 && (
                <button
                  className="btn btn-primary"
                  onClick={shuffleSelectedQuizzes}
                >
                  Shuffle Selected
                </button>
              )}
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Select</th>
              <th>Quiz ID</th>
              <th>Question</th>
              <th>Image</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {(viewType === "Sequential" ? quizzes : randomQuizzes).map(
              (quiz) => (
                <tr key={quiz.id}>
                  <td>
                    {/* Render checkbox only if viewType is Sequential */}
                    {viewType === "Sequential" && (
                      <input
                        type="checkbox"
                        checked={!!selectedQuizzes[quiz.id]}
                        onChange={() => handleCheckboxChange(quiz.id)}
                      />
                    )}
                  </td>
                  <td>{viewType === "Random" ? "Random" : quiz.id}</td>
                  <td>{viewType === "Random" ? "Random" : parse(quiz.text)}</td>
                  <td>N/A</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={marks[quiz.id] || ""}
                      onChange={(e) =>
                        handleMarksChange(quiz.id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-end my-3">
          <button className="btn btn-primary" onClick={handleAddQuizzes}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryQuizList;
