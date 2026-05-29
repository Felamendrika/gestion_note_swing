/**
 * note.controller.js - Gère les requêtes HTTP pour les notes
 * Contient la logique de réponse (status codes, JSON)
 */

import NoteModel from "../models/note.model.js";

const noteController = {
    getAll: async (req, res) => {
        try {
            const { ne } = req.query;
            const notes = await NoteModel.findAll(ne);

            if (!notes || notes.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Aucune note récuperée"
                })
            }

            res.status(200).json({
                success: true,
                message: "Liste des notes",
                data: notes,
                count: notes.length
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur serveur lors de la récuperation des notes",
                error: error.message
            })
        }
    },

    /**
     * GET /api/notes/:codemat
     * Recuperer d'une note par son codemat et ne 
     */
    getOne: async (req, res) => {
        try {
            const { ne, codemat } = req.params;
            const note = await NoteModel.findOne(ne, codemat);

            if (!note) {
                return res.status(404).json({
                    success: false,
                    message: 'Note non trouvée'
                })
            }

            res.status(200).json({
                success: false,
                data: note
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    },

    create: async (req, res) => {
        try {
            const { ne, codemat, note } = req.body;
            
            console.log(`📝 Ajout note: ne=${ne}, codemat=${codemat}, note=${note}`);

            if (!ne || !codemat || note === undefined) {
                console.log("❌ Champs manquants");
                return res.status(400).json({ 
                    success: false, 
                    message: 'Tous les champs sont requis : ne, codemat, note' 
                });
            }
            
            const existing = await NoteModel.findOne(ne, codemat);
            if (existing) {
                console.log(`❌ Note existe déjà pour ${ne}/${codemat}`);
                return res.status(409).json({ 
                    success: false, 
                    message: 'Une note existe déjà pour cet étudiant dans cette matière' 
                });
            }
            
            await NoteModel.create({ ne, codemat, note });
            console.log(`✅ Note ajoutée avec succès pour ${ne}/${codemat}`);

            res.status(201).json({ 
                success: true, 
                message: 'Note ajoutée avec succès' 
            });
        } catch (error) {
            console.error('❌ Erreur create note:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { ne, codemat } = req.params;
            const { note } = req.body;
            
            const existing = await NoteModel.findOne(ne, codemat);
            if (!existing) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Note non trouvée' 
                });
            }
            
            await NoteModel.update(ne, codemat, note);
            res.status(200).json({ 
                success: true, 
                message: 'Note modifiée avec succès' 
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { ne, codemat } = req.params;
            
            const existing = await NoteModel.findOne(ne, codemat);
            if (!existing) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Note non trouvée' 
                });
            }
            
            await NoteModel.delete(ne, codemat);
            res.status(200).json({ 
                success: true, 
                message: 'Note supprimée avec succès' 
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default noteController;