import React, { useContext, useEffect, useState } from "react";
import jobContext from "../context/notes/jobContext";
import JobItem from "./JobItem";
import { Link } from "react-router-dom";

const Search = () => {
  const context = useContext(jobContext);
  const { jobs } = context;
  const [city, setCity] = useState("");
  const [ren, setRen] = useState(null);

  const onChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(city);
    setRen(jobs.filter((job) => job.location === city));
  };

  // useEffect(() => {
  //   handleClick();

  // }, []);

  return (
    <>
      <div className="serachBar">
        <input
          type="search"
          name="location"
          value={city}
          onChange={onChange}
          placeholder="search by location"
        />
        <span>
          <button className="search_btn" type="submit" onClick={handleClick}>
            search
          </button>
        </span>
      </div>

      {ren !== null && ren !== " " && <h2 className="search_h2">Jobs present at {city}</h2>}
      <div className="outerContainer">
        {ren !== null &&
          ren.map((job) => (
            <Link target="_blank" to={`/jobs/${job._id}`}>
              <div className="item" key={job._id}>
                <div className="card">
                  <h1>{job.title}</h1>
                  <p>{job.employer.companyName}</p>
                  <p>
                    {job.description.slice(0, 60)} ...
                    <Link to={`/jobs/${job._id}`}>more</Link>
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {job.jobType}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Search;
