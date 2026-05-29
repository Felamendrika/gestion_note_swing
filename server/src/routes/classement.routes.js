/**
 * classementRoutes.js - Routes pour le classement
 */

import express from 'express';
import classementController from '../controllers/classement.controller.js';

const router = express.Router();

router.get('/:niveau', classementController.getClassement);   // GET /api/classement/L3

export default router;