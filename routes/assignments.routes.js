import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import {
  createAssignment,
  getAssignments
} from '../controllers/assignments.controller.js';

const router = express.Router();

router.post('/', protect, isAdmin, createAssignment);
router.get('/', protect, getAssignments);

export default router;
