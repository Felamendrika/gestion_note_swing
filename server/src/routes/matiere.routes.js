/**
 * matiereRoutes.js - Routes pour /api/matieres
 */

import express from 'express';
import matiereController from '../controllers/matiere.controller.js';

const router = express.Router();

router.get('/', matiereController.getAll);
router.get('/:codemat', matiereController.getById);
router.post('/', matiereController.create);
router.put('/:codemat', matiereController.update);
router.delete('/:codemat', matiereController.delete);

export default router;