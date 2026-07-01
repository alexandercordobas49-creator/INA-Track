import { Router } from 'express';
import { createCourse, listCourses } from '../controllers/courseController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', listCourses);
router.post('/', authenticateToken, authorizeRoles('admin'), createCourse);

export default router;
