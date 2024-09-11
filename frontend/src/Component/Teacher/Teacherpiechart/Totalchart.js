import React from 'react'
import BarChart from './Barchart'
import DoughnutChart from './Piechart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import "./Piechart.css";

function Totalchart() {
  return (
    <div className='container-fluid'>
      <h3 className='txtteacher'>Welcome to Teacher Dashboard</h3>
      <p><FontAwesomeIcon icon={faAngleLeft} className='arrow mx-3'/>Attendance List</p> 
        <div className='row'>
            <div className='col-sm-12 col-lg-6'>
                <BarChart/>
            </div>
            <div className='col-sm-12 col-lg-6'>
               <DoughnutChart/>
            </div>
        </div>
      
          <div className='d-flex justify-content-around'>
          <h5>Students List</h5>
          <select>
            <option>Department</option>
            <option></option>
            <option></option>
          </select>
          </div>
          <div className='container'>
          <table className='tbl w-100 my-4'>
            <thead>
              <tr>
                <th>Roll.No</th>
                <th>Name</th>
                <th>Department/Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>890934</td>
                <td>Dev</td>
                <td>BCA I</td>
              </tr>
              <tr>
                <td>890934</td>
                <td>Dev</td>
                <td>BCA I</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
  
  )
}
export default Totalchart