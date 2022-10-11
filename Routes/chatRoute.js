const express = require('express')
const { createChat, findChat, userChats, deleteChat } = require('../Controllers/chatController');
const router = express.Router()

router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);
router.get('/delete/:id',deleteChat);

module.exports = router