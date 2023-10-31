import React, { useContext, useState } from 'react'
import {useNavigate,Link} from 'react-router-dom';



const Login = (props) => {


    const [credentials,setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();


    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handelSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
          
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({email:credentials.email,password:credentials.password})
              });
    
              const json = await response.json();
              console.log(json);

              if(json.success){
                // redirect
                localStorage.setItem("token" , json.authtoken);
                // console.log(json.role);
                localStorage.setItem("userRole" , json.role)
                // console.log(json.data[0].role);


                navigate("/");
                props.showAlert('success fully login','success');


            }else{
                props.showAlert("incorrect credentials","danger");

              }
            
        } catch (error) {
            console.log(error);
        }
    
    }
  return (
    <div className="container my-5">
      <h2>Log in</h2>
      <p>Don’t have an account? <Link to = '/signup'>Join here</Link> </p>
    <form onSubmit={handelSubmit}>
  <div className="form-group my-3">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} placeholder="Enter email" onChange={onChange} />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Login