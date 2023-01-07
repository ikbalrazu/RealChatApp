const express = require('express');
const { addMessage, getMessages, DeleteChatMessage } = require('../Controllers/messageController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/', addMessage);

router.get('/:chatId', authMiddleware, getMessages);

router.post('/filterallmessage', DeleteChatMessage);

module.exports = router