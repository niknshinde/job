import React, { useContext, useState } from 'react';
import jobContext from '../context/notes/jobContext';
const AddJob = () => {
  const context = useContext(jobContext);
  const { postJob } = context;

  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    jobType: 'Full-time',
  });

  const handleClick = (e) => {
    e.preventDefault();
    postJob(job.title, job.description, job.location, job.jobType);
    setJob({
      title: '',
      description: '',
      location: '',
      jobType: 'Full-time',
    });
  };

  const onChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Post New Job</h2>
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
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          {/* <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={job.description}
            onChange={onChange}
          /> */}

           <textarea
            className="form-control"
            id="description"
            name="description"
            value={job.description}
            placeholder="Description"
            required
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
          <select
            className="form-select"
            id="jobType"
            name="jobType"
            value={job.jobType}
            onChange={onChange}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <button
          disabled={
            job.title.length < 1 ||
            job.description.length < 1 ||
            job.location.length < 1
          }
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Post 
        </button>
      </form>
    </div>
  );
};

export default AddJob;
