import React from 'react';
import "./Attendancetime.css";
// import Switch from '@mui/material/Switch';

function Attendancetime() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className='container-fluid'>
      <h4 className='greettext'>Welcome to Teacher Dashboard</h4>
      <p>Punch Schedule Setting</p>
      <p>Schedule List</p>
      <div className='row'>

        <div className='col-sm-12 col-md-8'>
        <div className=' d-flex'>
          <div className='purplebox d-flex justify-content-center align-items-center m-1'>S</div>
          <div className='purplebox d-flex justify-content-center align-items-center m-1'>M</div>
          <div className='purplebox d-flex justify-content-center align-items-center m-1'>T</div>
          <div className='purplebox d-flex justify-content-center align-items-center m-1'>W</div>
          <div className='purplebox d-flex justify-content-center align-items-center m-1'>T</div>
          <div className='purplebox d-flex justify-content-center align-items-center m-1'>F</div>
          <div className='purplebox d-flex justify-content-center align-items-center m-1'>S</div>
          <div className='purple1 d-flex justify-content-center align-items-center m-1'>+</div>
        </div>
     
      
      <div className='card shadowpart'>
        <div className='row'>
          <div className='col-md-6'>
            <label htmlFor="start-time">Start Time</label>
            <input type="datetime-local" id="start-time" name="start-time" className="datetime-input"/>
          </div>
          <div className='col-md-6'>
            <label htmlFor="end-time">End Time</label>
            <input type="datetime-local" id="end-time" name="end-time" className="datetime-input"/>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
            <input type='submit' value="Set" className='btn btn-primary mt-3'/>
        </div>
        </div>
        </div>
        <div className='col-sm-12 col-md-4'>
          
        <div className='card m-2 p-1 cardboxes'>
            <div className='d-flex justify-content-between'>
            <p className='text-light'>9:00 -10:00</p>
            <p className='text-light'>S M T W T F S </p>
            {/* <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/> */}
            </div>
          </div>

          <div className='card m-2 p-1 cardboxes'>
            <div className='d-flex justify-content-between'>
            <p className='text-light'>9:00 -10:00</p>
            <p className=' text-light'>S M T W T F S </p>
            {/* <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/> */}
            </div>
          </div>

          <div className='card m-2 p-1 cardboxes'>
            <div className='d-flex justify-content-between'>
            <p className='text-light'>9:00 -10:00</p>
            <p className=' text-light'>S M T W T F S </p>
            {/* <Switch color='dark' checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/> */}
            </div>
          </div>
       
        </div>
      </div>
    </div>
  );
}

export default Attendancetime;
