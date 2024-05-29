const express = require('express')
const {loginController,registerController,authController}=require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware');


//router object
const router = express.Router();

//routes
//Login || PORT
router.post('/login',loginController);

//Register || PORT

router.post('/register',registerController);

//Auth || PORT

router.post('/getUserData',authMiddleware , authController);

module.exports = router;
