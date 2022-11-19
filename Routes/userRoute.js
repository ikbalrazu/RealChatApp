const express = require('express');
const {getUser,getAllUsers,registerUser,loginUser,getSelectedUser,ExistUser,uploadImage,DeleteImage,ResetPasswordLink} = require('../Controllers/userController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.get('/:id', getUser);
router.get('/',authMiddleware,getAllUsers);
router.post("/searchuser",getSelectedUser);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/uploadimage',uploadImage);
router.post('/checkuserbyemail',ExistUser);
router.post('/deleteimage',DeleteImage);
router.get('/resetpasswordlink/:email',ResetPasswordLink);

module.exports = router;