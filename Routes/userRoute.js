const express = require('express');
const {getUser,getAllUsers,registerUser,loginUser,getSelectedUser} = require('../Controllers/userController');
const router = express.Router();

router.get('/:id', getUser);
router.get('/',getAllUsers);
router.post("/searchuser",getSelectedUser);
router.post('/register',registerUser);
router.post('/login',loginUser);

module.exports = router;