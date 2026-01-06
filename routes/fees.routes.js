import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import { addFee, getStudentFees } from '../controllers/fees.controller.js';

const router = express.Router();

router.post('/', protect, isAdmin, addFee);
router.get('/:student_id', protect, getStudentFees);

export default router;
