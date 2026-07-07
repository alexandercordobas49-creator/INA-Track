import { Router } from 'express';
import { achievementSummary } from '../controllers/achievementController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:userId', authenticateToken, achievementSummary);

export default router;
