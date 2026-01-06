import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import { markAttendance } from '../controllers/attendance.controller.js';

const router = express.Router();

router.post('/', protect, isAdmin, markAttendance);

export default router;
