// import React from 'react';
// import { motion } from 'framer-motion';
// import './Sidebarinstructor.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUser,faBars, faBook, faFile, faFileLines, faLightbulb, faPowerOff, faCode, faFileUpload, faLaptopFile } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

// const sidebarVariants = {
//   open: { width: '200px' },
//   closed: { width: '50px' },
// };

// const linkVariants = {
//   open: { opacity: 1, display: 'block' },
//   closed: { opacity: 0, display: 'none' },
// };

// function Sidebarinstructor() {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <motion.div
//       className="sidebar"
//       initial={false}
//       animate={isOpen ? 'open' : 'closed'}
//       variants={sidebarVariants}>
//       <div className="toggle-btn" onClick={toggleSidebar}>
//         <FontAwesomeIcon icon={faBars} />
//       </div>
//       <ul>
//         <li>
//             <Link to={"/instructordashboard/courselist"} className='d-flex'><FontAwesomeIcon icon={faHome} className='mx-1 text-light mt-1'/>
//           <motion.span variants={linkVariants} className='text-white text-decoration-none ms-1'>Home</motion.span>
//           </Link>
//         </li>
//         <li>
//             <Link to="/instructordashboard/coursemodule" className='d-flex'> <FontAwesomeIcon icon={faFile} className='mx-1 text-light mt-1'/>
//             <motion.span variants={linkVariants} className='text-white text-decoration-none ms-1'>Module</motion.span>
//             </Link>
//         </li>
//         <li>
//             <Link to="/instructordashboard/coursecontent" className='d-flex'><FontAwesomeIcon icon={faFileUpload} className='mx-1 text-light mt-1'/>
//             <motion.span variants={linkVariants} className='text-white text-decoration-none ms-1'>Course Content</motion.span>
//             </Link>
//         </li>
       
//         <li>
//             <Link to="/instructordashboard/quilltxt" className='d-flex'><FontAwesomeIcon icon={faLightbulb} className='mx-1 text-light mt-1'/>
//             <motion.span variants={linkVariants} className='text-white text-decoration-none ms-1'>Quiz</motion.span>
//             </Link>
//         </li>
//         <li>
//             <Link to="/instructordashboard/questionbank" className='d-flex'><FontAwesomeIcon icon={faBook} className='mx-1 text-light mt-1'/>
//             <motion.span variants={linkVariants} className='text-white text-decoration-none ms-1 '>Question Bank</motion.span>
//             </Link>
//         </li>
//         <li>
//             <Link to="/" className='d-flex'><FontAwesomeIcon icon={faPowerOff} className='mx-1 text-light mt-1'/>
//             <motion.span variants={linkVariants} className='text-white text-decoration-none ms-1 '>Logout</motion.span>
//             </Link>
//         </li>
//       </ul>
//     </motion.div>
//   );
// }

// export default Sidebarinstructor;


import React from 'react';
import { motion } from 'framer-motion';
import './Sidebarinstructor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faBook, faFile, faFileUpload, faLightbulb, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams  } from 'react-router-dom';

const sidebarVariants = {
  open: { width: '200px' },
  closed: { width: '50px' },
};

const linkVariants = {
  open: { opacity: 1, display: 'block' },
  closed: { opacity: 0, display: 'none' },
};



function Sidebarinstructor({ isOpen, toggleSidebar }) {
  const { id } = useParams();
  return (
    <motion.div
      className="sidebar"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li>
          <Link to={`/instructordashboard/${id}/courselist`} className='d-flex'>
            <FontAwesomeIcon icon={faHome} className='mx-1 text-light mt-1' />
            <motion.span variants={linkVariants} className='text ms-1 text-light'>Home</motion.span>
          </Link>
        </li>
        <li>
          <Link to={`/instructordashboard/${id}/coursemodule`} className='d-flex'>
            <FontAwesomeIcon icon={faFile} className='mx-1 text-light mt-1' />
            <motion.span variants={linkVariants} className='text ms-1 text-light'>Module</motion.span>
          </Link>
        </li>
        <li>
          <Link to={`/instructordashboard/${id}/coursecontent`} className='d-flex'>
            <FontAwesomeIcon icon={faFileUpload} className='mx-1 text-light mt-1' />
            <motion.span variants={linkVariants} className='text ms-1 text-light'>Course Content</motion.span>
          </Link>
        </li>
        <li>
            <Link to={`/instructordashboard/${id}/quilltxt`} className='d-flex'>
            <FontAwesomeIcon icon={faLightbulb} className='mx-1 text-light mt-1' />
            <motion.span variants={linkVariants} className='text ms-1 text-light'>Quiz</motion.span>
          </Link>
        </li>
        <li>
          <Link to={`/instructordashboard/${id}/questionbank`} className='d-flex'>
            <FontAwesomeIcon icon={faBook} className='mx-1 text-light mt-1' />
            <motion.span variants={linkVariants} className='text ms-1 text-light'>Question Bank</motion.span>
          </Link>
        </li>
        <li>
          <Link to="/" className='d-flex'>
            <FontAwesomeIcon icon={faPowerOff} className='mx-1 text-light mt-1' />
            <motion.span variants={linkVariants} className='text ms-1 text-light'>Logout</motion.span>
          </Link>
        </li>
      </ul>
    </motion.div>
  );
}

export default Sidebarinstructor;
