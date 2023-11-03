import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUP = (props) => {

  const [credentials,setCredentials] = useState({name: "",email:"",password:"",cpassword:""});
  let navigate = useNavigate();


  const onChange =(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  const handelSubmit = async(e)=>{
      e.preventDefault();
      const{name,email,password} = credentials;
      try {
          const response = await fetch('https://job-portal-backend-f934.onrender.com/api/auth/createemployee', {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
        
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({name,email,password})
            });
  
            const json = await response.json();
            console.log(json);
            localStorage.setItem("token" , json);
            localStorage.setItem("userRole" , "employee");

            if(json){
              // redirect
              navigate("/");
              props.showAlert('success fully sign-in','success');


          }else{
            props.showAlert("incorrect credentials","danger");
          }
          
      } catch (error) {
          console.log(error);
      }
  
  }


  return (
    <div className="container my-5">
      <h2> Employee Sign up for TalentSphere</h2>
      <p>Create a free account or <Link to = "/login">log in</Link></p>

      <form onSubmit={handelSubmit}>
        <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="text"
            name="name"
            value={credentials.name}
            placeholder="Enter Name"
            required
            minLength={2}
            onChange={onChange}
          />
   </div>
          <div className="form-group my-3">

          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            required
            minLength={6}
            value={credentials.password}
            onChange={onChange}
          />
        </div>


        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="confirm Password"
            name="cpassword"
            
            required
            minLength={6}
            value={credentials.cpassword}
            onChange={onChange}
          />
        </div>

        <p>sign up as <Link to = "/createemployer"> Employer/Hiring Person</Link></p>


        <button disabled= {credentials.cpassword !== credentials.password} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUP;
