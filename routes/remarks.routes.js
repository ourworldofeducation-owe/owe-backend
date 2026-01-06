import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import { addRemark } from '../controllers/remarks.controller.js';

const router = express.Router();

router.post('/', protect, isAdmin, addRemark);

export default router;
