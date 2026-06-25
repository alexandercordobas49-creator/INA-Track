import { Router } from 'express';
import { listRoutes, getRoute, getUserProgress, completeMission, getRouteProgress } from '../controllers/competencyController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/routes', authenticateToken, listRoutes);
router.get('/routes/:routeId', authenticateToken, getRoute);
router.get('/users/:userId/progress', authenticateToken, getUserProgress);
router.get('/users/:userId/routes/:routeId', authenticateToken, getRouteProgress);
router.post('/complete', authenticateToken, authorizeRoles('student', 'admin'), completeMission);

export default router;
