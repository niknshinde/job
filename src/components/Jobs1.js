import React, { useContext, useEffect, useRef, useState } from 'react';
import jobContext from '../context/notes/jobContext';
import JobItem from './JobItem';
import AddJob from './AddJob';
import { useNavigate } from 'react-router-dom';

const Jobs1 = () => {
  let navigate = useNavigate();

  const context = useContext(jobContext);
  const { jobs,fetchUserJobs, fetchAllJobs, editJob } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUserJobs();
    } else {
      // Redirecting to login page
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [editJob]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [job, setJob] = useState({
    id: '',
    title: '',
    description: '',
    location: '',
    jobType: '',
  });

  const updateJob = (currentJob) => {
    ref.current.click();
    setJob({
      id: currentJob._id,
      title: currentJob.title,
      description: currentJob.description,
      location: currentJob.location,
      jobType: currentJob.jobType,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editJob(job.id, job.title, job.description, job.location, job.jobType);
    refClose.current.click();
  };

  const onChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddJob />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Job
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={job.title}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={job.description}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={job.location}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="jobType" className="form-label">
                    Job Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobType"
                    name="jobType"
                    value={job.jobType}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  job.title.length < 1 ||
                  job.description.length < 1 ||
                  job.location.length < 1 ||
                  job.jobType.length < 1
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Job
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>Posted Job's</h2>
      <div className="post-job-outercontainer">
        {jobs.map((job) => {
          return <JobItem key={job._id} updateJob={updateJob} job={job} />;
        })}
      </div>
    </>
  );
};

export default Jobs1;
