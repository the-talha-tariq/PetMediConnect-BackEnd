const userModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
  try {
    console.log('RegisterController Hit');
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: 'User Already Exists', success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "User Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Error in Register Controller ${error.message}` });
  }
};

const loginController = async (req, res) => {
  try {
    console.log('LoginController Hit');
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: 'User Not Found', success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).send({ message: "Login Successfully", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Error in Login Controller ${error.message}` });
  }
};


const authController = async (req,res)=>{
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    if(!user){
      return res.status(200).send({message:"User Not Found",success:false})
    }
    else{
      return res.status(200).send({data:{name:user.name,email:user.email},message:"User Found",success:true})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({message:"Auth Error",success:false,error})
  }
}
module.exports = { loginController, registerController,authController };
