// import React from 'react';
// import { FaBell, FaUserCircle } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import "./Menubar.css";

// function Menubar() {
//   return (
//     <div>
//       <nav className="navbar">
//         <Link to="/" className="logo">Logo</Link>
//         <ul className="menu">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">MyCourses</Link></li>
//           <li><Link to="/contact">Skillset</Link></li>

// {/* searchbar */}
//           <div className='box'>
//             <input type='text' placeholder='Search...' />
//             <a href='#' />
//             <FontAwesomeIcon icon={faSearch} className="search-icon" />
//           </div>
 
//         </ul>
//         <div className="right-section">
//           <Link to="/login" className="nav-link text-light" >Login</Link> {/* Add Login Link */}
//           <FaBell className="icon" />
//           <FaUserCircle className="icon" />
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Menubar;


import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./Menubar.css";

function Menubar() {
  return (
    <Navbar className="navbarbgcolour" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/activecourse" >MyCourses</Nav.Link>
       
            <Nav.Item>
            <div className='box mt-1 mx-2'>
             <input type='text' placeholder='Search...' />
           <a href='#' />
            <FontAwesomeIcon icon={faSearch} className="search-icon text-dark iconsearch" />
           </div>
 
 
              {/* <div className="input-group">
                <input type="text" className="form-control" placeholder="Search..." />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div> */}
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            {/* <Nav.Item>
              <Nav.Link as={Link} to="/contact" className='iconviews'>Notification</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/contact" className='iconviews'>Profile</Nav.Link>
            </Nav.Item> */}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menubar;
