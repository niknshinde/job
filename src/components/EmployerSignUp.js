import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EmployerSignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    companyName: '',
    industry: '',
    companyDescription: '',
    companyLocation: '',
    password: '',

  });
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email,companyName, industry, companyDescription, companyLocation,password } = credentials;
    try {
      const response = await fetch('http://localhost:5000/api/auth/createemployer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email,companyName, industry, companyDescription, companyLocation,password}),
      });

      const json = await response.json();
      console.log(json);
      localStorage.setItem('token', json);
      localStorage.setItem("userRole" , "employer");


      if (json) {
        // Redirect
        navigate('/');
        props.showAlert('Successfully signed up', 'success');
      } else {
        props.showAlert('Incorrect credentials', 'danger');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Employer Sign up for TalentSphere</h2>
      <p>
        Create a free employer account or <Link to="/login">log in</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <label htmlFor="name">Name</label> */}
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            placeholder="Enter Name"
            required
            minLength={2}
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          {/* <label htmlFor="email">Email address</label> */}
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            value={credentials.email}
            placeholder="Enter email"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            required
            minLength={6}
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          {/* <label htmlFor="company">Company Name</label> */}
          <input
            type="text"
            className="form-control"
            id="companyName"
            name="companyName"
            value={credentials.companyName}
            placeholder="Enter Company Name"
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          {/* <label htmlFor="industry">Industry</label> */}
          <input
            type="text"
            className="form-control"
            id="industry"
            name="industry"
            value={credentials.industry}
            placeholder="Enter Industry"
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          {/* <label htmlFor="companyDescription">Company Description</label> */}
          <textarea
            className="form-control"
            id="companyDescription"
            name="companyDescription"
            value={credentials.companyDescription}
            placeholder="Enter Company Description"
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          {/* <label htmlFor="companyLocation">Company Location</label> */}
          <input
            type="text"
            className="form-control"
            id="companyLocation"
            name="companyLocation"
            value={credentials.companyLocation}
            placeholder="Enter Company Location"
            required
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployerSignUp;
