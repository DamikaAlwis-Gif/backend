const router = require("express").Router();

const User = require("../models/User");

//signup
router.post("/",(req,res) => {
  const newUser = new User(req.body);

  newUser.save()
  .then((savedContact) => {
    //console.log(savedContact);
    res.status(201).json({ msg: "User successfully saved!" , user: savedContact});
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({error});
  })
})

module.exports = router;