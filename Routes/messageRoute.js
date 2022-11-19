const express = require('express');
const { addMessage, getMessages, DeleteChatMessage } = require('../Controllers/messageController');

const router = express.Router();

router.post('/', addMessage);

router.get('/:chatId', getMessages);

router.post('/filterallmessage', DeleteChatMessage);

module.exports = router