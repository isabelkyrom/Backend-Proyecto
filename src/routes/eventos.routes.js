const express = require('express');
const controller = require('../controllers/eventos.controller');
const { authMiddleware } = require('../auth')

const router = express.Router();

// GETs
router.get('/', authMiddleware, controller.getAll)
router.get('/:id', authMiddleware, controller.getById)

// Create
router.post('/', authMiddleware, controller.create)

// Update
router.put('/:id', authMiddleware, controller.update)

// Delete
router.delete('/:id', authMiddleware, controller.remove)


module.exports = { router };