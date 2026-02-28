const express = require('express');
const controller = require('../controllers/users.controller');
const { authMiddleware } = require('../auth');

const router = express.Router();


router.post('/login', controller.loginUser)

router.post('/create', controller.create)

router.get('/me', authMiddleware, controller.getMe)

module.exports = { router }