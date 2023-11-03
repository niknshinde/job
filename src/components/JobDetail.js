
import React , { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const host = 'https://job-portal-backend-f934.onrender.com';

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
        setJob(json);
      } catch (error) {
        console.error("Error fetching job details:", error);
        // Handle any error, e.g., show an error message or redirect to an error page
      }
    };

    fetchJobDetails(id);
  },[]);

  return (
    <div className="job-details">
      {job ? (
        <>
          <h1>{job.title}</h1>
          
          <h3>about {job.employer.companyName} </h3>
          <p>{job.employer.companyDescription}</p>

          <h3>about Job</h3>
          <p>{job.description}</p>
          <strong>Location: {job.location}</strong>
          {/* Display other job details as needed */}
          <br />
          <button>Apply</button>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default JobDetail;
