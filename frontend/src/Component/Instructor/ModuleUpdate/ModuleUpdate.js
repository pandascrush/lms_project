import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ModuleUpdate.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModuleUpdate() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [updatedModuleName, setUpdatedModuleName] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getmodule`)
      .then((res) => {
        setModules(res.data.result);
      });
  }, []);

  const handleUpdateModule = () => {
    if (!selectedModuleId || !updatedModuleName) {
      toast.error("Please select a module");
      return;
    }

    // Log the selected module and new name for debugging
    console.log(selectedModuleId, updatedModuleName);

    // Call the backend to update the module name
    axios
      .put(`${process.env.REACT_APP_API_URL}course/updatemodule`, {
        moduleid: selectedModuleId,
        modulename: updatedModuleName,
      })
      .then((res) => {
        if (res.data.message === "Module updated successfully") {
          toast.success("Module updated successfully!");
          setUpdatedModuleName(""); // Clear the input field
        } else if (res.data.message === "Failed to update module") {
          toast.error("Failed to update module");
        }
      })
      .catch((err) => {
        console.error("Error updating module:", err);
        alert("Failed to update module.");
      });
  };

  return (
    <div className="module-update-container">
      <h2 className="module2">Update Module Name</h2>
      <ToastContainer />
      <div>
        <label className="modulelabel">Select Module:</label>
        <select
          value={selectedModuleId}
          onChange={(e) => setSelectedModuleId(e.target.value)}
          className="selectbox"
        >
          <option value="">--Select Module--</option>
          {modules.map((module) => (
            <option key={module.moduleid} value={module.moduleid}>
              {module.modulename}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>New Module Name:</label>
        <input
          type="text"
          value={updatedModuleName}
          onChange={(e) => setUpdatedModuleName(e.target.value)}
          className="inp1"
        />
      </div>
      <br />
      <button onClick={handleUpdateModule} className="updatebtn">
        Update Module
      </button>
    </div>
  );
}

export default ModuleUpdate;
