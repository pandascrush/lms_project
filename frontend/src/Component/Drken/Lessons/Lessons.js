import React, { useEffect, useState } from "react";
import "./Lessons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Lessons() {
  const [module, setModule] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add state for authentication
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState(null); // State for storing the locked module
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("env", process.env.REACT_APP_API_URL);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}auth/protected`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Fetch module data
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getmodule/1`)
      .then((res) => {
        console.log(res.data.modules);
        setModule(res.data.modules);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleShowModal = (module) => {
    setModalContent(module);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    handleCloseModal();
  };

  return (
    <div className="container-fluid">
      {module.map((e) => (
        <div key={e.moduleId} className="row lessoncard py-2 rounded-3 my-4">
          {isAuthenticated || e.moduleId === 1 ? (
            <Link
              to={`/ken/1/${e.moduleId}/${id}`}
              className="col-sm-12 lessonview text-decoration-none"
              style={{ color: "#001040" }}
            >
              <div className="col-lg-4 d-flex flex-column justify-content-center">
                <img
                  src={e.module_image}
                  alt="lesson"
                  className="rounded-3 lesson"
                />
              </div>
              <div className="col-lg-6 d-flex flex-column justify-content-center textpart">
                <h5>Chapter {e.moduleId}</h5>
                <h3>{e.modulename}</h3>
                <p>{e.activities}</p>
              </div>
              <div className="col-lg-2 d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </Link>
          ) : (
            <div
              className="col-sm-12 lessonview"
              onClick={() => handleShowModal(e)}
              style={{ cursor: "pointer" }}
            >
              <div className="col-lg-4 d-flex flex-column justify-content-center">
                <img
                  src={e.module_image}
                  alt="lesson"
                  className="rounded-3 lesson"
                />
              </div>
              <div className="col-lg-6 d-flex flex-column justify-content-center textpart">
                <h5>Chapter {e.moduleId}</h5>
                <h3>{e.modulename}</h3>
                <p>{e.activities}</p>
              </div>
              <div className="col-lg-2 d-flex justify-content-center align-items-center">
                <span className="locked-icon">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Modal for locked content */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        className="modeltext"
      >
        <Modal.Header closeButton style={{ borderBottom: "none" }}>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ borderBottom: "none", fontSize: "18px" }}>
          <p>
            <b>Please log in to access this Chapter.</b>
          </p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button className="logbutton" onClick={handleLoginRedirect}>
            Login
          </Button>
          <Button
            variant="danger"
            onClick={handleCloseModal}
            className="border-0"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Lessons;
