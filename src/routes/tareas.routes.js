const express = require('express');
const controller = require('../controllers/tareas.controller');
const { authMiddleware } = require('../auth')

const router = express.Router();

// GETs
router.get('/hechas', authMiddleware, controller.getHechas)
router.get('/noHechas', authMiddleware, controller.getNoHechas)
router.get('/', authMiddleware, controller.getAll)
router.get('/:id', authMiddleware, controller.getById)

// Create
router.post('/', authMiddleware, controller.create)

// Update
router.put('/:id', authMiddleware, controller.update)
router.put('/:id/:hecha', authMiddleware, controller.changeEstado)

// Delete
router.delete('/:id', authMiddleware, controller.remove)


module.exports = { router };