import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import { getAdmins, getStudentsWithFeeSummary, getSubjects } from '../controllers/admin.controller.js';
import { authorizeAdmin } from '../middlewares/adminMiddleware.js';

import {
    createParent,
    createStudent,
    createSubject,
    getAllParents,
    getAllStudents
} from '../controllers/admin.controller.js';
import {
    assignSubjectToStudent,
    getStudentSubjects,
    removeStudentSubject
} from '../controllers/admin.controller.js';


const router = express.Router();

// get admins
router.get('/', protect, isAdmin, getAdmins);

/* Parents */
router.post('/parents', protect, authorizeAdmin, createParent);
router.get('/parents', protect, authorizeAdmin, getAllParents);

/* Students */
router.post('/students', protect, authorizeAdmin, createStudent);
router.get('/students', protect, authorizeAdmin, getAllStudents);
/*student with fee summary*/
router.get("/students/fees-summary", getStudentsWithFeeSummary);

// assign subjects to student
router.post('/student-subjects', protect, authorizeAdmin, assignSubjectToStudent);
router.get('/student-subjects/:studentId', protect, authorizeAdmin, getStudentSubjects);
router.delete('/student-subjects/:id', protect, authorizeAdmin, removeStudentSubject);

/* Subjects */
router.post('/subjects', protect, authorizeAdmin, createSubject);
router.get('/subjects', protect, authorizeAdmin, getSubjects);

export default router;
