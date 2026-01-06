import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getParentDashboard } from '../controllers/parent.controller.js';
import { getAssignments } from '../controllers/assignments.controller.js';

const router = express.Router();

router.get('/dashboard', protect, getParentDashboard);
router.get('/assignments',protect, getAssignments)

export default router;
