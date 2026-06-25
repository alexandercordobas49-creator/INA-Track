import { Router } from 'express';
import { listAttendance, saveAttendance } from '../controllers/attendanceController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, listAttendance);
router.post('/', authenticateToken, authorizeRoles('instructor', 'admin'), saveAttendance);

export default router;
