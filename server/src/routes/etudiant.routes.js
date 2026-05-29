/**
 * etudiant.routes.js - Définition des routes pour /api/etudiants
 */

import express from 'express';
import etudiantController from '../controllers/etudiant.controller.js';

const router = express.Router();

// Routes publiques 
router.get('/', etudiantController.getAll);
router.get('/:ne', etudiantController.getById);
router.get("/search/:keyword", etudiantController.search);
router.post('/', etudiantController.create);
router.put('/:ne', etudiantController.update);
router.delete('/:ne', etudiantController.delete);

export default router;
