import { Router } from 'express';
import { studentDashboard, parentChildren, parentView } from '../controllers/dashboardController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/student/:userId', authenticateToken, studentDashboard);
router.get('/parent/:parentId/children', authenticateToken, authorizeRoles('parent', 'admin'), parentChildren);
router.get('/parent/:parentId/child/:childId', authenticateToken, authorizeRoles('parent', 'admin'), parentView);

export default router;
