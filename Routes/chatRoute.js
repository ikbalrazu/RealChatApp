const express = require('express')
const { createChat, findChat, userChats, deleteChat } = require('../Controllers/chatController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router()

router.post('/', createChat);
router.get('/:userId', authMiddleware,  userChats);
router.get('/find/:firstId/:secondId', authMiddleware, findChat);
router.get('/delete/:id', authMiddleware, deleteChat);

module.exports = router