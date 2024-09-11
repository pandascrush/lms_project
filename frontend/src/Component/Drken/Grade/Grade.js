import React from 'react';
import "./Grade.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Grade() {
    const navigate = useNavigate(); // Correctly use useNavigate

    const handleNavigate = () => {
      navigate('/'); // Replace with the actual path you want to navigate to
    };
  return (
    <div className='container-fluid'>
        {/* <div className='my-4'>
          <FontAwesomeIcon icon={faArrowLeft} className='arrowsize' onClick={handleNavigate()}/>
          </div> */}
      <div className='d-flex justify-content-center align-items-center px-5'>
        <table className='responsive-table'>
          <thead>
            <tr className='text-center'>
              <th>Lessons</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody >
            <tr className='texttable'>
              <td className='ps-5'>1. Who am I?</td>
              <td className='text-center'>59 %</td>
            </tr>
            <tr className='texttable'>
              <td className='ps-5'>2. Who Suffers?</td>
              <td className='text-center'>89 %</td>
            </tr>
            <tr className='texttable'>
              <td className='ps-5'>3. How many people are suffering?</td>
              <td>79 %</td>
            </tr>
            <tr className='texttable'>
              <td className='ps-5'>4. How many people are suffering?</td>
              <td>79 %</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grade;