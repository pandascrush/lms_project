// // // import React from 'react';
// // // import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
// // // import { FaBell, FaUserCircle } from 'react-icons/fa';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faBell, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
// // // import { Link } from 'react-router-dom';
// // // import "./Drmenubar.css";

// // // function Drmenubar() {
// // //   return (
// // //     <Navbar expand="lg">
// // //       <Container>
// // //         <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
// // //         <Navbar.Toggle aria-controls="navbar-nav" />
// // //         <Navbar.Collapse id="navbar-nav">
// // //           <Nav className="mx-auto">
// // //             <Nav.Link as={Link} to="/" className='navpart px-3'>Home</Nav.Link>
// // //             <Nav.Link as={Link} to="/" className='navpart px-3'>My Course</Nav.Link>
// // //             <Nav.Link as={Link} to="/" className='navpart px-3'>Batch</Nav.Link>
// // //             <Nav.Link as={Link} to="/" className='navpart px-3'>Grade</Nav.Link>
// // //             <div className="search-bar">
// // //             <input type="search" placeholder="Search..." className='border-0'/>
// // //             <FontAwesomeIcon icon={faSearch} className="search-icon ms-auto" />
// // //             </div>
// // //             <div className='ms-auto'>
// // //            <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faUser} className='text-dark'/></Nav.Link>
// // //            </div>
// // //           </Nav>

// // //         </Navbar.Collapse>
// // //       </Container>
// // //     </Navbar>
// // //   );
// // // }

// // // export default Drmenubar;

// // // import React from 'react';
// // // import { Navbar, Nav, Container } from 'react-bootstrap';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faBell, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
// // // import { Link } from 'react-router-dom';
// // // import "./Drmenubar.css";
// // // import loginimg from "../../../Asset/profile.png"
// // // import Mainlogo from "../../../Asset/logospine.png"

// // // function Drmenubar() {
// // //   return (
// // //     <Navbar expand="lg" className='navbarcontenttext'>
// // //       <Container>
// // //         <Navbar.Brand as={Link} to="/"><img src={Mainlogo}/></Navbar.Brand>
// // //         <Navbar.Toggle aria-controls="navbar-nav" />
// // //         <Navbar.Collapse id="navbar-nav">
// // //           <Nav className="mx-auto textfonted ps-lg-5 me-lg-4">
// // //             <Nav.Link as={Link} to="/" className='navpart px-3' activeClassName="active-link" >Home</Nav.Link>
// // //             <Nav.Link as={Link} to="lessons" className='navpart px-3' activeClassName="active-link" >My Course</Nav.Link>
// // //             <Nav.Link as={Link} to="/" className='navpart px-3' activeClassName="active-link" >Batch</Nav.Link>
// // //             <Nav.Link as={Link} to="/" className='navpart px-3' activeClassName="active-link" >Grade</Nav.Link>
// // //             <div className="search-bar px-5">
// // //               <FontAwesomeIcon icon={faSearch} className="search-icon" />
// // //               <input type="search" placeholder="Search..." className='border-0'/>
// // //             </div>
// // //           </Nav>
// // //           <Nav className="ms-auto">
// // //             <Nav.Link as={Link} to="/login"><img src={loginimg} className='imglogin'/></Nav.Link>
// // //           </Nav>
// // //         </Navbar.Collapse>
// // //       </Container>
// // //     </Navbar>
// // //   );
// // // }

// // // export default Drmenubar;

// // import React from 'react';
// // import { Navbar, Nav, Container } from 'react-bootstrap';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faSearch } from '@fortawesome/free-solid-svg-icons';
// // import { NavLink } from 'react-router-dom'; // Use NavLink for active class
// // import "./Drmenubar.css";
// // import loginimg from "../../../Asset/profile.png";
// // import Mainlogo from "../../../Asset/image 39.png";

// // function Drmenubar() {
// //   return (
// //     <Navbar expand="lg" className='navbarcontenttext'>
// //       <Container>
// //         <Navbar.Brand as={NavLink} to="/">
// //           <img src={Mainlogo} alt="Main Logo" />
// //         </Navbar.Brand>
// //         <Navbar.Toggle aria-controls="navbar-nav" />
// //         <Navbar.Collapse id="navbar-nav">
// //           <Nav className="mx-auto textfonted ps-lg-5 me-lg-4">
// //             <Nav.Link as={NavLink} to="/" className='navpart px-3' activeClassName="active-link">
// //               Home
// //             </Nav.Link>
// //             <Nav.Link as={NavLink} to="/lessons" className='navpart px-3' activeClassName="active-link">
// //               My Course
// //             </Nav.Link>
// //             <Nav.Link as={NavLink} to="/" className='navpart px-3' activeClassName="active-link">
// //               Badge
// //             </Nav.Link>
// //             <Nav.Link as={NavLink} to="/" className='navpart px-3' activeClassName="active-link">
// //               Grade
// //             </Nav.Link>
// //           </Nav>
// //           <Nav className="ms-auto">
// //           <div className="search-bar d-flex align-items-center px-3">
// //               <FontAwesomeIcon icon={faSearch} className="search-icon" />
// //               <input type="search" placeholder="Search" className='border-0 searchinput' />
// //             </div>
// //             <Nav.Link as={NavLink} to="/login">
// //               <img src={loginimg} alt="Login" className='imglogin ms-4' />
// //             </Nav.Link>
// //           </Nav>
// //         </Navbar.Collapse>
// //       </Container>
// //     </Navbar>
// //   );
// // }

// // export default Drmenubar;

// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { NavLink } from 'react-router-dom'; // Use NavLink for active class
// import "./Drmenubar.css";
// import loginimg from "../../../Asset/profile.png";
// import Mainlogo from "../../../Asset/image 39.png";

// function Drmenubar() {
//   return (
//     <Navbar expand="lg" className='navbarcontenttext'>
//       <Container>
//         <Navbar.Brand as={NavLink} to="/">
//           <img src={Mainlogo} alt="Main Logo" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="ms-auto textfonted ps-lg-5 me-lg-4">
//             <Nav.Link as={NavLink} to="/" className='navpart px-3' activeClassName="active-link">
//               Home
//             </Nav.Link>
//             <Nav.Link as={NavLink} to="/lessons" className='navpart px-3' activeClassName="active-link">
//               My Course
//             </Nav.Link>
//             <Nav.Link as={NavLink} to="/" className='navpart px-3' activeClassName="active-link">
//               Badge
//             </Nav.Link>
//             <Nav.Link as={NavLink} to="/" className='navpart px-3' activeClassName="active-link">
//               Grade
//             </Nav.Link>
//           </Nav>
//           <Nav className="ms-auto d-lg-flex d-none align-items-center">
//             <div className="search-bar d-flex align-items-center px-3">
//               <FontAwesomeIcon icon={faSearch} className="search-icon" />
//               <input type="search" placeholder="Search" className='border-0 searchinput' />
//             </div>
//             <Nav.Link as={NavLink} to="/login">
//               <img src={loginimg} alt="Login" className='imglogin ms-4' />
//             </Nav.Link>
//           </Nav>
//           <Nav className="d-lg-none">
//             <div className="search-bar d-flex align-items-center px-3">
//               <FontAwesomeIcon icon={faSearch} className="search-icon" />
//               <input type="search" placeholder="Search" className='border-0 searchinput' />
//             </div>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Drmenubar;

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./Drmenubar.css";
import loginimg from "../../../Asset/profile.png";
import Mainlogo from "../../../Asset/image 39.png";

function Drmenubar() {
  return (
    <Navbar expand="lg" className="navbarcontenttext my-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={Mainlogo} alt="Main Logo" className="ms-5 ms-lg-5" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto d-lg-none">
            <Nav.Link
              as={NavLink}
              to="/"
              className="navpart px-3"
              activeClassName="active-link"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/allcourselist"
              className="navpart px-3"
              activeClassName="active-link"
            >
              My Course
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/grade"
              className="navpart px-3"
              activeClassName="active-link"
            >
              Grade
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/badge"
              className="navpart px-3"
              activeClassName="active-link"
            >
              Badge
            </Nav.Link>

            <div className="search-bar d-flex align-items-center px-5 mt-2">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="search"
                placeholder="Search"
                className="border-0 searchinput"
              />
            </div>
            <Nav.Link
              as={NavLink}
              to="/login"
              className="navpart px-3"
              activeClassName="active-link"
            >
              Logout
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto d-none d-lg-flex align-items-center">
            <NavLink
              to="/"
              className="navpart px-3"
              activeClassName="active-link"
            >
              Home
            </NavLink>
            <NavLink
              to="/allcourselist"
              className="navpart px-3"
              activeClassName="active-link"
            >
              My Course
            </NavLink>
            <NavLink
              to="/grade"
              className="navpart px-3"
              activeClassName="active-link"
            >
              Grade
            </NavLink>
            <NavLink
              to="/badge"
              className="navpart px-3 me-4"
              activeClassName="active-link"
            >
              Badge
            </NavLink>

            <div className="search-bar d-none d-lg-flex align-items-center p-2">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="search"
                placeholder="Search"
                className="border-0 searchinput"
              />
            </div>
            <Nav.Link as={NavLink} to="/login" className="ms-4">
              <img src={loginimg} alt="Login" className="imglogin" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Drmenubar;
