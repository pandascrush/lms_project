import React from 'react'
import DrKen from "../../../Asset/ken.png";
import "./Instructor.css";
import cert1 from "../../../Asset/3dcomputer.png";
import cert2 from "../../../Asset/3dspine.png";
import cert3 from "../../../Asset/3dcertificate.png";
import starticon from "../../../Asset/star.png";
function Instructors() {
  return (
    <div className='container'>
<div className='row'>
    <h1 className='authortext my-5 text-center'>Author Introduction</h1>
<div className='col-sm-12 col-lg-6'>
    <img src={DrKen} alt='About Dr.Ken Hansraj,M.D' className='drimg'/> 
</div>
                <div className='col-sm-12 col-lg-6 aboutDr mt-5'>
                <h2 className='Drtext my-4'>Dr.Ken Hansraj,M.D</h2>
                <p className='abtken'>For more than 20 years, Dr. Ken Hansraj has dedicated his life to eradicating spinal problems. With an in-depth knowledge of and a vast experience in spine care, he has discovered andsimplified the core factors and strategies that can be applied to improve the quality of spinal health. His work helps people to understand spine wellness, spinal conditions, and to augment people’s physical, mental and emotional well-being through the spine.</p>
                <p className='abtken my-4'>Dr. Ken’s work has influenced people in every country to feel better and to do more. His studies on spine care costs, text neck and backpack forces have influenced global positions, and global trends</p>
                </div>
</div>
<div className='row my-5 abtken secondpara'>
    <p>Kenneth K. Hansraj, M.D. is a spinal and orthopedic surgeon specializing in cervical, thoracic and lumbar procedures. He performs knifeless surgery, bloodless spine surgery, minimally invasive approaches when possible, advanced bone grafting, techniques using spinal navigation to assess instrumentation placement, modern operating tables, spinal cord and nerve monitoring during spine surgery and uses stem cells in spine surgery</p>
    <p>Dr. Ken believes in whole body wellness, preventative care, and that the spine is a principal indicator of general health impacted by “human software and hardware.”</p>
</div>


<div className='row'>
    <div className='col-sm-12 col-lg-6'>
        <div className='certificatecards rounded-4'>
        <div className='row px-2 py-2'>
            <div className='col-3 text-start'>
                <h3 className='certifiedheading mt-4'>Professional Training</h3>
            </div>
            <div className='col'>
             <img src={cert1}  /> 
            </div>
        </div>

        <div className='text-start mx-4'>
            <ul>
                <li><b>Fellowship in Scoliosis and Spinal Surgery</b></li>
                <p>The Hospital for Special Surgery, New York, New York</p>
                <li><b>Fellowship in Minimally Invasive Spinal Surgery</b></li>
                <p>California Center for Minimally Invasive Spine Surgery, Thousand Oaks, California</p>
                <li><b>Orthopaedic Surgery Residency Training</b></li>
                <p>King/Drew Medical Center,Los Angeles, California</p>
                <li><b>General Surgery Training</b></li>
                <p>Mount Sinai Hospital, New York, New York</p>
                <li><b>Fellowship in Orthopedic Biomechanics</b></li>
                <p className='pb-5'>The Hospital for Special Surgery, New York, New York</p>
            </ul>
        </div>
        </div>
    </div>


    <div className='col-sm-12 col-lg-6'>
        <div className='rounded-4 certificatecards'>
    <div className='row rounded-3 px-5 py-2'>
            <div className='col text-start'>
                <h3 className='certifiedheading mt-4'>Board <br/>Certifications</h3>
            </div>
            <div className='col'>
             <img src={cert3} className='imgcertificate' /> 
            </div>
        </div>
        <div className='text-start px-5 py-2'>
        <p><img src={starticon} className='px-2' alt='*'/>American Board of Orthopedic Surgeons</p>
        <p><img src={starticon} className='px-2' alt='*'/>American Board of Minimally Invasive Spinal Medicine and Surgery</p>
        <p><img src={starticon} className='px-2' alt='*'/>National Board of Medical Examiners</p>
        </div>

    </div>
    <div className='rounded-4 certificatecards my-4'>
    <div className='row rounded-3 px-4 '>
    <h3 className='certifiedheading mt-3'>Professional Affiliations</h3>
            <div className='col-sm-9 text-start my-4 order-2 order-lg-1'>
                <div>
                          
            <ul>
                <li><b>Attending Orthopaedic Spine Surgeon</b></li>
                <p>Westchester Medical Center Valhalla, New York</p>
                <li><b>Attending Orthopaedic Spine Surgeon</b></li>
                <p>Mid-Hudson Regional Hospital of Westchester Medical Center</p>
            </ul>
            </div>
            </div>
            <div className='col-sm-3 order-1 order-lg-2 d-flex justify-content-center'>
             <img src={cert2} className='sm-mt-0 md-mt-5'/> 
            </div>
        </div>
    </div>
</div>
    </div>
    </div>
  )
}

export default Instructors