import React , { useState } from 'react'; 
import jobContext from '../context/notes/jobContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


// const Section1 = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const context = useContext(jobContext);
//   const { jobs, fetchAllJobs, editJob } = context;



//   useEffect(() => {
//     fetchAllJobs();
    
//   }, [editJob]);

  
//   const totalSlides = data.length - 1;

//   const prevSlide = () => {
//     setCurrentSlide(currentSlide === 0 ? totalSlides : currentSlide - 1);
//   };

//   const nextSlide = () => {
//     setCurrentSlide(currentSlide === totalSlides ? 0 : currentSlide + 1);
//   };
  
//   return (
//     <div className="slider">
//       <div className="slider-wrapper"
//         style={{ transform: `translateX(-${currentSlide * 50}%)` }}>

//         {jobs.map((job) => (
//           <div className="slide" key={job._id} >
//             <div className="card">
//               <h1>{job.title}</h1>
//               <p>{job.description}</p> 
//             </div>
//           </div>
//         ))}
      
//       </div>
//      <div className="btn">
//       <button onClick={prevSlide}>Prev</button> 
//       <button onClick={nextSlide}>Next</button>
//       </div>
//     </div>
//   );
// }

// export default Section1;


const Section1 = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  const context = useContext(jobContext);
  const { jobs, fetchAllJobs, editJob } = context;
  useEffect(() => {
        fetchAllJobs();
        
      }, [editJob]);
    
  return (
    <div className='outerContainer'>


          {jobs.map((job) => (
          <Link to={`/jobs/${job._id}`}>
          <div className="item" key={job._id} >
            <div className="card" >
             <h1>{job.title}</h1>
             <p>{job.employer.companyName}</p>
             <p>{job.description.slice(0, 60)} ...<Link to={`/jobs/${job._id}`}>more</Link></p>
             <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{job.jobType}</p>
              </div>
          </div>
          </Link>

        ))}


    </div>
  )
}

export default Section1