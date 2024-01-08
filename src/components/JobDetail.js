import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams();
  const host = "https://job-portal-backend-z21e.onrender.com";

  const [job, setJob] = useState(null);

  let isEmployer =
    localStorage.getItem("token") &&
    localStorage.getItem("userRole") === "employer";

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
  }, []);

  return (
    <div className="job-details min_height">
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
          

          <Link to={`/ApplyJobForm/${job._id}`} state={{ jobId: job._id, employerId: job.employer._id }}>
          <button className="nav-btn">Apply</button>
          </Link>
          
        </>
      ) : (
        <div>
          <p>Loading data...</p>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
