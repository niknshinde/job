import React, { useContext } from 'react';
import jobContext from '../context/notes/jobContext';
import { Link } from 'react-router-dom';

const JobItem = (props) => {
  const context = useContext(jobContext);
  const { deleteJob, editJob } = context;
  const { job } = props;

  return (
    <div className="outerContainer">

     <div className="item" key={job._id} >
      <div className="card">
          <div className="d-flex align-items-center">
            <h5>{job.title}</h5>
            <i className="bi bi-trash-fill mx-3" onClick={() => deleteJob(job._id)}></i>
            {/* <i className="bi bi-pencil-square" onClick={() => editJob(job._id)}></i> */}
          </div>

          <p className="card-text">
            <Link to={`/jobs/${job._id}`}>{job.description.slice(0, 100)} </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
