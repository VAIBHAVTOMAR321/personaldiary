const { model } = require("mongoose");
const Login = require("../Model/SignUp");

exports.login = (req, res) => {
  Login.find(
    { email: req.body.email, password: req.body.password })
    .then((user) =>{
      if(!user){
        res.status(400).json("User Not Found")
      }
      else if(user.length > 0)
      {
        res.status(200).json(user);
      }
      else
      { 
        res.status(400).json({
          message:"User not found"
        })
      }
    }).catch((err) =>{
      res.status(400).send(err);
    })
};
