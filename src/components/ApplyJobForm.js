import React , { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";


import { useParams } from 'react-router-dom';


const ApplyJobForm = (props) => {

  const { id } = useParams();
  const host = 'https://job-portal-backend-z21e.onrender.com';

  const [job, setJob] = useState(null);

  let isEmployer = localStorage.getItem('token') && localStorage.getItem('userRole') === 'employer';
  useEffect(() => {
    const fetchJobDetails = async (id) => {
      try {
        const response = await fetch(`${host}/api/jobs/fetchjob/:${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json);
        setJob(json);
      } catch (error) {
        console.error("Error fetching job details:", error);
        // Handle any error, e.g., show an error message or redirect to an error page
      }
    };

    fetchJobDetails(id);
  },[]);


  // if (!props.location || !props.location.state) {
  //   // Handle the case where location or state is undefined
  //   return (
  //     <div>
  //       <h1>Error: Unable to retrieve job information</h1>
  //       <p>Please make sure you are navigating from a valid job link.</p>
  //     </div>
  //   );
  // }

  const location = useLocation();

  const { jobId, employerId } = location.state;

  console.log(employerId);

   
   


    
  const [application, setApplication] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    coverLetter: '',
    resume: '',
  });

  const onChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size <= 5 * 1024 * 1024) {
      setApplication({
        ...application,
        resume: file,
      });
    } else {
      alert(`File size should be less than 5MB but your file size is ${Math.round(file.size / 1048576)}`);
      // Clear the file input
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log(application);
  };

  
  ///\lets find 


  // const handleSubmitClick =(e) =>{
  //   e.preventDefault();

  // }


  return (
 
    <div className="container my-5 min_height">
      {job ? (
        <>
        <h2>Apply for Job at {job.employer.companyName} </h2>
        <h3>as a {job.title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={application.name}
              placeholder="Enter Name"
              required
              minLength={2}
              onChange={onChange}
            />
          </div>
  
          <div className="form-group my-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              value={application.email}
              placeholder="Enter email"
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
  
          <div className="form-group my-3">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={application.phoneNumber}
              onChange={onChange}
            />
          </div>
  
          <div className="form-group my-3">
            <label htmlFor="coverLetter">Cover Letter</label>
            <textarea
              className="form-control"
              id="coverLetter"
              name="coverLetter"
              rows="4"
              placeholder="Write your cover letter here..."
              value={application.coverLetter}
              onChange={onChange}
            ></textarea>
          </div>
  
          <div className="form-group my-3">
            <label htmlFor="resume">Upload Resume (PDF only & less than 5MB)</label>
            <input
              type="file"
              className="form-control"
              id="resume"
              name="resume"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>
  
          <button  type="submit" className="btn btn-primary">
            Submit Application
          </button>
        </form>
        </>
      ) : ( 
      <div><p>Loading data...</p></div>
      )
      }
    </div>
  );
};

export default ApplyJobForm;
