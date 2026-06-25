import { Router } from 'express';
import { runAlerts, listNotifications } from '../controllers/alertsController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/run', authenticateToken, authorizeRoles('admin'), runAlerts);
router.get('/notifications', authenticateToken, listNotifications);

export default router;
