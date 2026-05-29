/**
 * app.js - Configuration principale d'Express
 * Centralise les middlewares et les routes
 */

import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

// IMPORTATION DES ROUTES
import etudiantRoutes from './routes/etudiant.routes.js';
import matiereRoutes from './routes/matiere.routes.js';
import noteRoutes from './routes/note.routes.js';
import bulletinRoutes from './routes/bulletin.routes.js';
import classementRoutes from './routes/classement.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ 
        message: 'API Gestion des Notes - Backend OK',
        version: '1.0.0',
        endpoints: {
            etudiants: '/api/etudiants',
            matieres: '/api/matieres',
            notes: '/api/notes',
            bulletins: '/api/bulletins/:ne',
            classement: '/api/classement/:niveau'
        }
    });
});

// Routes de l'API
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/matieres', matiereRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/bulletins', bulletinRoutes);
app.use('/api/classement', classementRoutes);

// Gestion des routes inexistantes (404)
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: `Route ${req.method} ${req.originalUrl} non trouvée`,
        // availableEndpoints: {
        //     etudiants: 'GET /api/etudiants, POST /api/etudiants, PUT /api/etudiants/:ne, DELETE /api/etudiants/:ne',
        //     matieres: 'GET /api/matieres, POST /api/matieres, PUT /api/matieres/:codemat, DELETE /api/matieres/:codemat',
        //     notes: 'GET /api/notes, POST /api/notes, PUT /api/notes/:ne/:codemat, DELETE /api/notes/:ne/:codemat',
        //     bulletins: 'GET /api/bulletins/:ne',
        //     classement: 'GET /api/classement/:niveau'
        // }
    });
});

export default app;