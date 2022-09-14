const express = require('express');
const {getUser,getAllUsers,registerUser,loginUser} = require('../Controllers/userController');
const router = express.Router();

router.get('/:id', getUser);
router.get('/',getAllUsers);
router.post('/register',registerUser);
router.post('/login',loginUser);

module.exports = router;