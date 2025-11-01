const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, portfolioController.addProject);
router.get('/', authMiddleware, portfolioController.getProjects);
router.delete('/:id', authMiddleware, portfolioController.deleteProject);

module.exports = router;
