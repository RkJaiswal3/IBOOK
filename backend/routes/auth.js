const express = require('express');
const User = require('../models/Users');
const { body, validationResult} = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs')
const JWT_SECRET = "fksdkfj";
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//creat a user using post: "/api/auth/createUser". Doesn't use require auth
//Route 1 
router.post('/createUser',[
    body('name', 'Enter a valid name').isLength({ min: 3}), //validation setting by using npm express validator
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 4})
],async (req, res)=>{
  let success = false;
//if there are errors return the bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

  //check whether the user exits, or user is already exits with email
  try{

    let user =await User.findOne({email: req.body.email});
    if(user)
      {
        return res.status(400).json({success, error: "User have already exits"});
      }

      const salt = await bcrypt.genSalt(10);
      secPass =await bcrypt.hash(req.body.password, salt);
    //creating user the new one and passed as json to 
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id
        }
      }

      const authToken =jwt.sign(data, JWT_SECRET); 
      
      success = true;
      res.json({success, authToken});

      // .then(user => res.json(user)).catch(err => res.json({error:'Please enter a unique value for email...', message: err.message}));
    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
    })

//authenticate a user
// Route 2
    router.post('/login', [
      body('email', 'Enter a valid email').isEmail(),
      body('password', 'Password cannot be blank').exists()
  ], async (req, res)=> {
    
    let success = false; //change

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email, password } = req.body; //destruturing

      try {
        let user =await User.findOne({email});

        if(!user){
          success = false;
          return res.status(400).json({success, error: "Please try to login with correct credential"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
          success = false;
          return res.status(400).json({success, error: "Please try to login with correct credential "})
        }
        const data = {
          user: {
            id: user.id
          }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});

      } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error");

      }
  })
  

  //Route 3 get logged in user details using post "/api/auth/getuser"
  router.post('/getuser', fetchuser, async (req, res)=> { 
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }

})

    module.exports = router
    
    
    