import { Router } from 'express';
import { xpSummary } from '../controllers/xpController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:userId', authenticateToken, xpSummary);

export default router;
