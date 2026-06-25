import { Router } from 'express';
import { askAtlas } from '../controllers/atlasController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/ask', authenticateToken, askAtlas);

export default router;
