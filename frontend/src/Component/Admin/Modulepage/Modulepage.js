// import React, { useState } from "react";
// import DropdownTreeSelect from 'react-dropdown-tree-select';
// import 'react-dropdown-tree-select/dist/styles.css';

// import axios from "axios";
// import "./Modulepage.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Modulepage() {
//   const [textareas, setTextareas] = useState([""]);
//   const [selected, setSelected] = useState([]);

//   useEffect(() => {
//     // Fetch the courses when the component mounts
//     axios.get("http://192.168.252.191:5000/course/getcourse")
//     .then((res) => {
//       console.log(res.data);
//       setCourses(res.data.result);
//     });
//   }, []);

//   // Example category data with nested courses, modules, and submodules
//   const data = [
//     {
//       label: 'Course 1',
//       value: 'Course-1',
//       children: [
//         {
//           label: 'Module 1.1',
//           value: 'Module-1-1',
//           children: [
//             {
//               label: 'Submodule 1.1.1',
//               value: 'Submodule-1-1-1',
//               children: [
//                 {
//                   label: 'Video 1.1.1.1',
//                   value: 'Video-1-1-1-1',
//                 },
//                 {
//                   label: 'Quiz 1.1.1.2',
//                   value: 'Quiz-1-1-1-2',
//                 },
//               ],
//             },
//             {
//               label: 'Module 1.1.2',
//               value: 'module-1-1-2',
//               children: [
//                 {
//                   label: 'Submodule 1.1.2.1',
//                   value: 'submodule-1-1-2-1',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Course 1.2',
//           value: 'course-1-2',
//           children: [
//             {
//               label: 'Module 1.2.1',
//               value: 'module-1-2-1',
//               children: [
//                 {
//                   label: 'Submodule 1.2.1.1',
//                   value: 'submodule-1-2-1-1',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       label: 'Category 2',
//       value: 'category-2',
//       children: [
//         {
//           label: 'Course 2.1',
//           value: 'course-2-1',
//           children: [
//             {
//               label: 'Module 2.1.1',
//               value: 'module-2-1-1',
//               children: [
//                 {
//                   label: 'Submodule 2.1.1.1',
//                   value: 'submodule-2-1-1-1',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Course 2.2',
//           value: 'course-2-2',
//           children: [
//             {
//               label: 'Module 2.2.1',
//               value: 'module-2-2-1',
//               children: [
//                 {
//                   label: 'Submodule 2.2.1.1',
//                   value: 'submodule-2-2-1-1',
//                 },
//               ],
//             },
//             {
//               label: 'Module 2.2.2',
//               value: 'module-2-2-2',
//               children: [
//                 {
//                   label: 'Submodule 2.2.2.1',
//                   value: 'submodule-2-2-2-1',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ];

//   const handleChange = (currentNode, selectedNodes) => {
//     setSelected(selectedNodes);

//     if (currentNode && currentNode.label) {
//       // alert(Selected: ${currentNode.label});

//     }

//     console.log('Selected Nodes:', selectedNodes);
//   };
//   const addTextarea = () => {
//     setTextareas([...textareas, ""]);
//   };

//   const handleTextareaChange = (index, value) => {
//     const newTextareas = [...textareas];
//     newTextareas[index] = value;
//     setTextareas(newTextareas);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Filter out any empty textarea values
//     const moduleNames = textareas.filter((name) => name.trim() !== "");

//     if (moduleNames.length === 0) {
//       alert("Please enter at least one module name.");
//       return;
//     }

//     // Send the module names to the backend
//     axios
//       .post("http://192.168.252.191:5000/course/addmodule", {
//         moduleNames, // Send all module names as an array
//       })
//       .then((res) => {
//         console.log(res);

//         if (
//           res.data.message === "moduleNames is mandatory and should be an array"
//         ) {
//           toast.error("moduleNames is mandatory and should be an array");
//         } else if (res.data.message === "modules added successfully") {
//           toast.success("modules added successfully");
//           setTextareas([""]); // Clear textareas after successful submission
//         } else if (res.data.message === "db_error") {
//           toast.error("db_error");
//         }
//       })
//       .catch((error) => {
//         toast.error("There was an error creating the modules!", error);
//       });
//   };

//   return (
//     <div className="container-fluid modpart">
//        <h3 className="violettext">Welcome to Course Module</h3>
//        <h6>Select the Course</h6>
//       <DropdownTreeSelect
//         data={data}
//         onChange={handleChange}
//         className="bootstrap-demo"
//         texts={{ placeholder: "Select..." }}
//       />
//       <ToastContainer />

//       <div className="row">
//         <form onSubmit={handleSubmit}>
//           <p className="violettext my-1">Add Module</p>
//           <div className="submodulebox rounded-3">
//             {textareas.map((textarea, index) => (
//               <div key={index} className="d-flex align-items-center my-2 p-2">
//                 <textarea
//                   className="form-control mx-3"
//                   value={textarea}
//                   onChange={(e) => handleTextareaChange(index, e.target.value)}
//                   rows="2"
//                   cols="40"
//                   required
//                 />
//                 {index === textareas.length - 1 && (
//                   <button
//                     type="button"
//                     className="addbutton"
//                     onClick={addTextarea}
//                   >
//                     +
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="d-flex justify-content-between">
//             <button type="submit" className="submitbutton">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Modulepage;

import React, { useState, useEffect } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import axios from "axios";
import "./Modulepage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Modulepage() {
  const [textareas, setTextareas] = useState([""]);
  const [selected, setSelected] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [path, setPath] = useState("");
  const [courseId, setCourseId] = useState("");
  const [parentModule, setParentModule] = useState("");
  const [moduleStructure, setModuleStructure] = useState({});
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.252.191:5000/course/structured-data")
      .then((res) => {
        setCourses(res.data);
        setModuleStructure(buildModuleStructure(res.data));
      })
      .catch((error) => {
        toast.error("Failed to fetch courses!");
        console.error(error);
      });
  }, []);

  const buildModuleStructure = (nodes, parent = null) => {
    const structure = {};

    nodes.forEach((node, index) => {
      const path = `${index + 1}`;
      structure[node.value] = { path, parent: parent ? parent.value : null };

      if (node.children && node.children.length > 0) {
        traverseChildren(node.children, path, structure, node);
      }
    });

    return structure;
  };

  const findTopParentValue = (nodeValue) => {
    const findParent = (nodes, value) => {
      for (const node of nodes) {
        if (node.value === value) {
          return node;
        }
        if (node.children && node.children.length > 0) {
          const result = findParent(node.children, value);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };

    let currentNode = findParent(courses, nodeValue);

    // Traverse up to find the top-most parent
    while (currentNode && currentNode.parent) {
      currentNode = findParent(courses, currentNode.parent);
    }

    return currentNode ? currentNode.value : null;
  };

  const traverseChildren = (children, parentPath, structure, parent) => {
    children.forEach((child, index) => {
      const childPath = `${parentPath}/${index + 1}`;
      structure[child.value] = { path: childPath, parent: parent.value };

      if (child.children && child.children.length > 0) {
        traverseChildren(child.children, childPath, structure, child);
      }
    });
  };

  const findTopMostParent = (nodeValue, nodes) => {
    for (const node of nodes) {
      if (node.value === nodeValue) {
        return null; // This is the topmost parent
      }

      if (node.children) {
        const result = findTopMostParent(nodeValue, node.children);
        if (result !== null) {
          return result; // Return the topmost parent found in children
        }
      }
    }

    return null; // No parent found
  };

  const getTopMostParent = (nodeValue) => {
    return findTopMostParent(nodeValue, courses);
  };

  const findNextNumber = (path) => {
    const parts = path.split("/");
    if (parts.length === 0) return 1;
    const lastPart = parts[parts.length - 1];
    const nextNumber = parseInt(lastPart, 10) + 1;
    return nextNumber;
  };

  const findParentNode = (nodes, nodeValue) => {
    for (const node of nodes) {
      if (node.children) {
        const child = node.children.find((child) => child.value === nodeValue);
        if (child) {
          return node; // Parent found
        }
        const result = findParentNode(node.children, nodeValue);
        if (result) return result; // Parent found in a deeper level
      }
    }
    return null; // No parent found
  };

  const addNewModule = (parentNode, newModuleName) => {
    const parentPath = moduleStructure[parentNode.value] || "";
    const nextNumber = findNextNumber(parentPath);
    const newPath = `${parentPath}/${nextNumber}`;

    const newModule = {
      value: newModuleName,
      children: [],
    };

    const updatedCourses = [...courses];
    const parent = findParentNode(updatedCourses, parentNode.value);
    if (parent) {
      const index = parent.children.findIndex(
        (child) => child.value === parentNode.value
      );
      if (index !== -1) {
        if (!parent.children[index].children) {
          parent.children[index].children = [];
        }
        parent.children[index].children.push(newModule);
      }
    }

    setModuleStructure((prevStructure) => ({
      ...prevStructure,
      [newModuleName]: newPath,
    }));

    setCourses(updatedCourses);
  };

  const handleChange = (currentNode, selectedNodes, newModuleName) => {
    setSelected(selectedNodes);
    setSelectedNode(currentNode);

    if (currentNode) {
      const nodePath = moduleStructure[currentNode.value] || "";

      if (newModuleName) {
        addNewModule(currentNode, newModuleName);
      } else {
        setPath(nodePath); // Ensure nodePath is a string
      }

      const parentNode = findParentNode(courses, currentNode.value);
      setParentModule(parentNode ? parentNode.value : "");

      setSelectedModuleId(currentNode.value || "");

      // Get the top-most parent value
      const topParentValue = findTopParentValue(currentNode.value);
      console.log("Top Most Parent Value:", topParentValue);
    }
  };

  const addTextarea = () => {
    setTextareas([...textareas, ""]);
  };

  const handleTextareaChange = (index, value) => {
    const newTextareas = [...textareas];
    newTextareas[index] = value;
    setTextareas(newTextareas);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const moduleNames = textareas.filter((name) => name.trim() !== "");

    if (moduleNames.length === 0) {
      alert("Please enter at least one module name.");
      return;
    }

    // Ensure path is a string
    const pathParts = typeof path === "string" ? path.split("/") : [];
    const cleanedPath = pathParts.slice(1).join("/") || "1";

    const formData = new FormData();
    formData.append("moduleNames", JSON.stringify(moduleNames));
    formData.append("path", cleanedPath);
    formData.append("parentModule", parentModule);
    formData.append("courseId", courseId);
    formData.append("selectedModuleId", selectedModuleId);
    if (selectedFile) {
      formData.append("moduleImage", selectedFile); // Append the file to the formData
    }

    console.log(formData);

    axios
      .post("http://192.168.252.191:5000/course/addmodule", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (
          res.data.message === "moduleNames is mandatory and should be an array"
        ) {
          toast.error("moduleNames is mandatory and should be an array");
        } else if (res.data.message === "modules added successfully") {
          toast.success("Modules added successfully");
          setTextareas([""]);
          setModuleStructure((prev) => ({
            ...prev,
            [cleanedPath]: cleanedPath,
          }));
          setSelectedFile(null); // Clear the selected file after successful submission
        } else if (res.data.message === "db_error") {
          toast.error("Database error occurred!");
        }
      })
      .catch((error) => {
        toast.error("There was an error creating the modules!", error);
      });
  };

  return (
    <div className="container-fluid modpart">
      <h3 className="violettext">Welcome to Course Module</h3>
      <h6>Select the Course</h6>
      <DropdownTreeSelect
        data={courses}
        onChange={handleChange}
        className="bootstrap-demo"
        texts={{ placeholder: "Select..." }}
        value={selectedNode ? [selectedNode] : []}
      />
      <ToastContainer />
      <div className="col-md-6">
        <h4 className="violettext my-2">Add New Module</h4>
        <form onSubmit={handleSubmit}>
          {textareas.map((textarea, index) => (
            <div key={index} className="my-2">
              <textarea
                rows="3"
                value={textarea}
                onChange={(e) => handleTextareaChange(index, e.target.value)}
                className="form-control"
                placeholder={`Enter Module Name ${index + 1}`}
              />
              {index === textareas.length - 1 && (
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={addTextarea}
                >
                  Add Another Module
                </button>
              )}
            </div>
          ))}
          <div className="my-2">
            <label htmlFor="moduleImage" className="form-label violettext">
              Module Image (optional)
            </label>
            <input
              type="file"
              className="form-control"
              id="moduleImage"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modulepage;