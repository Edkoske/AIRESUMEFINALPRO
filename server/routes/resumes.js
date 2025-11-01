const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/generate', authMiddleware, resumeController.generateResume);
router.get('/', authMiddleware, resumeController.getResumes);
router.delete('/:id', authMiddleware, resumeController.deleteResume);

module.exports = router;
