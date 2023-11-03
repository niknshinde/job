// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import { Home1 } from './components/Home1';
import { About1 } from './components/About1';
import Login from './components/Login';
import SignUP from './components/SignUP';
import AlertSate from './context/alerts/AlertSate';
import Alert from './components/Alert';
import { useState } from 'react';
import EmployerSignUp from './components/EmployerSignUp';
import { JobState } from './context/notes/JobState';
import JobDetail from './components/JobDetail';
import DashBoard from './components/DashBoard';
import Footer from './components/Footer';



function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
    <AlertSate>
      <JobState>

      <Router>
        <Navbar />
        <Alert alert={alert}/>

        <div className='container'>
        <Routes>
          <Route path="/" element={<Home1 showAlert={showAlert} />} />
          <Route path="/dashboard" element={<DashBoard showAlert={showAlert} />} />


          <Route path="/about" element={<About1 />} />
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
          <Route path="/signup" element={<SignUP showAlert={showAlert}/>} />
          <Route path="/createemployer" element={<EmployerSignUp showAlert={showAlert}/>} />
          <Route path="/jobs/:id" element={<JobDetail />} />


        </Routes>
        </div>
      </Router>
      </JobState>
      </AlertSate>
      <Footer/>
    </>
    );
  
}

export default App;
