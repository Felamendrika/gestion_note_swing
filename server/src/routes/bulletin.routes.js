/**
 * bulletinRoutes.js - Routes pour les bulletins
 */

import express from 'express';
import bulletinController from '../controllers/bulletin.controller.js';

const router = express.Router();

router.get('/:ne', bulletinController.getBulletin);

export default router;