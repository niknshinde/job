const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Jobes = require("../models/Jobes");
const EmployerUser = require("../models/EmployerUser");
const Users = require("../models/Users");

 

const { body, validationResult } = require("express-validator");


const router = express.Router();



router.get('/fetchalljobs', async (req, res) => {
  try {
    const jobs = await Jobes.find()
      .populate({
        path: "employer", // Populate the employer field
        select: "name companyName companyDescription industry", // Select the fields you want from the employer
      });

    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});


router.get('/fetchuserjobs',fetchuser,async(req,res)=>{
    try {
        const job = await Jobes.find({employer : req.user.id});
        res.json(job);  
    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("internal server error");
    }
   
});


router.get('/fetchjob/::id',async (req, res) => {
    try {
        let job = await Jobes.findById(req.params.id)
        .populate({
          path: "employer", // Populate the employer field
          select: "name companyName companyDescription industry", // Select the fields you want from the employer
        });
        res.json(job);  
    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("internal server error");
    }
   
});


router.post('/postjob', [
    body("title", "Enter a valid job title").isLength({ min: 1 }),
    body("description", "Enter a valid job description").isLength({ min: 1 }),
    body("location", "Enter a valid job location").isLength({ min: 1 }),
    body("jobType", "Enter a valid job type").isLength({ min: 1 }),
  ], fetchuser, async (req, res) => {
    try {
      const result = validationResult(req);
      const { title, description, location, jobType } = req.body;
  
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      console.log(req.user);
  
      try {
        // Check if the user is an employer
        if (req.user.role !== "employer") {
          return res.status(403).json({ error: "Access denied. Only employers are allowed to post jobs." });
        }
  
        const job = new Jobes({
          title,
          description,
          location,
          jobType,
          employer: req.user.id, // Associate the job with the employer
        });
  
        const savedJob = await job.save();
        res.json(savedJob);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });




  router.delete('/deletejob/:id', fetchuser, async (req, res) => {
    try {
      // Find the job that the user wants to delete
      const job = await Jobes.findById(req.params.id);
  
      // Check if the job exists
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
  
      // Check if the user is authorized to delete the job (assuming you have user IDs stored in job documents)
      if (job.employer.toString() !== req.user.id) {
        return res.status(401).json({ error: "Unauthorized: You can't delete this job" });
      }
  
      // If the user is authorized, delete the job
      const deletedJob = await Jobes.findByIdAndDelete(req.params.id);
  
      res.json({ success: "Job has been deleted", deletedJob });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  

  module.exports =  router;
