import React, { useState } from 'react';
import JobContext from './jobContext';

export const JobState = (props) => {
  const host = 'https://job-portal-backend-z21e.onrender.com';
  const jobsInitial = [];

  const [jobs, setJobs] = useState(jobsInitial);

  const fetchAllJobs = async () => {
    try {
      const response = await fetch(`${host}/api/jobs/fetchalljobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'auth-token': localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      setJobs(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchUserJobs = async () => {
    try {
      const response = await fetch(`${host}/api/jobs/fetchuserjobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      setJobs(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchJob = async (id) => {
    try {
      const response = await fetch(`${host}/api/jobs/fetchjob/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        //   'auth-token': localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      setJobs(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const postJob = async (title, description, location, jobType) => {
    try {
      const response = await fetch(`${host}/api/jobs/postjob`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, location, jobType }),
      });
      const json = await response.json();
      setJobs([...jobs, json]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`${host}/api/jobs/deletejob/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      if (response.status === 200) {
        const updatedJobs = jobs.filter((job) => job._id !== id);
        setJobs(updatedJobs);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const editJob = async (id, title, description, location, jobType) => {
    try {
      const response = await fetch(`${host}/api/jobs/editjob/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, location, jobType }),
      });
      if (response.status === 200) {
        const updatedJobs = jobs.map((job) => (job._id === id ? { ...job, title, description, location, jobType } : job));
        setJobs(updatedJobs);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        fetchAllJobs,
        fetchUserJobs,
        fetchJob,
        postJob,
        deleteJob,
        editJob,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};
