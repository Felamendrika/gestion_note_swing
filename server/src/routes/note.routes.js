/**
 * noteRoutes.js - Routes pour /api/notes
 */

import express from 'express';
import noteController from '../controllers/note.controller.js';

const router = express.Router();

// GET /api/notes?ne=E001 (optionnel)
router.get('/', noteController.getAll);

// GET /api/notes/:ne/:codemat
router.get('/:ne/:codemat', noteController.getOne);

// POST /api/notes
router.post('/', noteController.create);

// PUT /api/notes/:ne/:codemat
router.put('/:ne/:codemat', noteController.update);

// DELETE /api/notes/:ne/:codemat
router.delete('/:ne/:codemat', noteController.delete);

export default router;