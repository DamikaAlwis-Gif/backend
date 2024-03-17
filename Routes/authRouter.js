const router = require("express").Router();
const {hashPassword, verifyPassword} = require("../passwordHash");
const User = require("../models/User");
const passport = require("passport")
//signup
router.post("/register",(req,res) => {
  const userData = req.body;

  // hash password
  hashPassword(userData.password)
  .then((hashPassword) => {
    // create user obj
    const newUser = new User({
      ...userData,
      password: hashPassword,
    });
    // save user
    newUser
      .save()
      .then((savedContact) => {
        
        res
          .status(201)
          .json({ msg: "User successfully saved!", user: savedContact });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      });

  })
  .catch((err) => {
    res.status(500).json({msg: err})
  })
  
});


// login
router.post("/login",(req,res,next) => {
  console.log("fsdf")
  passport.authenticate("local", (err, user, info) => {
    console.log(err);
    console.log(user);
    console.log(info);
  });
},
  (req,res) => {
   // console.log(req);

    return res.json(req.user);

  }
);

router.get("/login/success", (req,res) => {
  res.status(200).json("success")
});

router.get("/login/failed", (req, res) => {
  res.status(200).json("failed");
});

module.exports = router;