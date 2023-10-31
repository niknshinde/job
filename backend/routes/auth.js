const express = require("express");
const Users = require("../models/Users");
const EmployerUser = require("../models/EmployerUser");


// const Users = require("../models/Users");
//this is new for me
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const Jwt_SECRET = 'NIKHILSHInde$23214'
const router = express.Router();


//i need to delete below /createuser section 


router.post(
  "/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast of 5 letters").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    } else {
      console.log(req.body);
      (async () => {
        try {
          //checking is user alreay present in database
          const result = await Users.find({ email: req.body.email });
          console.log(result);
          if (result.length != 0) {
            return res
              .status(400)
              .json({
                error: "sorry a user with this email is all ready exist",
              });
          } else {
            // if user is not present in database already then create new user

            //creating salt 
            const salt = await bcrypt.genSalt(10);
            //creating password hash
            const secPass = await bcrypt.hash(req.body.password ,salt)
            const user = new Users({
                name:req.body.name,
                password : secPass,
                email:req.body.email,
            });

            const savedUser = await user.save();
            console.log("user saved successfully:", savedUser);
            const data = {
                user:{
                    id : user.id
                }
            }
            const authtoken = jwt.sign(data , Jwt_SECRET);

            res.json(authtoken,)

          }
        } catch (error) {
          console.error("Error saving user:", error);
        }
      })();
      // res.send("this is login page")
      // console.log(req.body);
    }
  }
);


router.post(
  "/createemployer",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("companyName", "Company name is required").not().isEmpty(),
    body("industry", "Industry is required").not().isEmpty(),
    body("companyDescription", "Company description is required").not().isEmpty(),
    body("companyLocation", "Company location is required").not().isEmpty(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    } else {
      (async () => {
        try {
          // Check if the user with this email already exists in the database
          const existingUser = await Users.findOne({ email: req.body.email });

          if (existingUser) {
            return res.status(400).json({
              error: "A user with this email already exists",
            });
          } else {
            // Create a salt
            const salt = await bcrypt.genSalt(10);
            // Create a password hash
            const passwordHash = await bcrypt.hash(req.body.password, salt);

            // Create a new employer user
            const employer = new Users({
              name: req.body.name,
              email: req.body.email,
              role: "employer", // You can set a role field to distinguish employers from employees
                companyName: req.body.companyName,
                industry: req.body.industry,
                companyDescription: req.body.companyDescription,
                companyLocation: req.body.companyLocation,
              
              password: passwordHash,
            });

            const savedEmployer = await employer.save();
            console.log("Employer saved successfully:", savedEmployer);

            const data = {
              user: {
                id: employer.id,
                role: "employer"

              },
            };
            const authToken = jwt.sign(data, Jwt_SECRET);

            res.json(authToken);
          }
        } catch (error) {
          console.error("Error saving employer:", error);
          res.status(500).json({ error: "Server Error" });
        }
      })();
    }
  }
);



router.post(
  "/createemployee",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    } else {
      (async () => {
        try {
          // Check if the user with this email already exists in the database
          const existingUser = await Users.findOne({ email: req.body.email });

          if (existingUser) {
            return res.status(400).json({
              error: "A user with this email already exists",
            });
          } else {
            // Create a salt
            const salt = await bcrypt.genSalt(10);
            // Create a password hash
            const passwordHash = await bcrypt.hash(req.body.password, salt);

            // Create a new employee user
            const employee = new Users({
              name: req.body.name,
              email: req.body.email,
              role: "employee", // Set the role field to "employee" to distinguish employees
              password: passwordHash,
            });

            const savedEmployee = await employee.save();
            console.log("Employee saved successfully:", savedEmployee);

            const data = {
              user: {
                id: employee.id,
                role: "employee"

                
              },
            };
            const authToken = jwt.sign(data, Jwt_SECRET);

            res.json(authToken);
          }
        } catch (error) {
          console.error("Error saving employee:", error);
          res.status(500).json({ error: "Server Error" });
        }
      })();
    }
  }
);



//login route

router.post("/login", [

    body("email", "Enter a valid email").isEmail(),
    body("password", "password can't we blank").exists(),

  ], (req,res)=>{
   const result2 = validationResult(req);
    if (!result2.isEmpty()) {
        return res.send({ errors: result2.array() });
      } else {
        

        (async () => {
     
            const {email,password} = req.body;
            let success = false;
        
            try {
                //checking is user with give email is present in database if 
                //i) find user in with given email in database
                let user = await Users.findOne({email});


                //ii)if user not exist then 
                if(!user){
                  success = false;
                    return res.status(400).json({error:"please try to login using right credentials"})
                }

                //ones user is present in database check it password matches with password provide by user during login 

                const passwordCompare = await bcrypt.compare(password,user.password)

                //if password is wrong
                if(!passwordCompare){
                  success = false;
                    return res.status(400).json({error:"please try to login using right credentials"})

                }
                
                //if password is right then we send user authentication

                const data = {
                    user:{
                        id : user.id,
                        role: user.role

                    }
                }

                let role = user.role;
                const authtoken = jwt.sign(data , Jwt_SECRET);
                success = true;
                res.json({success,authtoken ,role })
    



            } catch (error) {
                console.error("Error during login user:", error);
                res.status(500).json({ error: "Internal server error" }); 
            }
        })();
  } }
  )


  router.post("/getuser",fetchuser, async(req,res)=>{
     try {
      const userId = req.user.id;
      const user = await Users.findById(userId).select("-password")
      res.send(user)
     } catch (error) {
      console.error(error.mesage);
      res.status(500).send("internal server error");

     } 
  })

module.exports = router;
