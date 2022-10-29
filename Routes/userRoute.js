const express = require('express');
const {getUser,getAllUsers,registerUser,loginUser,getSelectedUser,ExistUser,uploadImage,DeleteImage} = require('../Controllers/userController');
const router = express.Router();

router.get('/:id', getUser);
router.get('/',getAllUsers);
router.post("/searchuser",getSelectedUser);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/uploadimage',uploadImage);
router.post('/checkuserbyemail',ExistUser);
router.post('/deleteimage',DeleteImage);

module.exports = router;