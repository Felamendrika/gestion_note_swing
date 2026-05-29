/**
 * matiere.controller.js - Gère les requêtes HTTP pour les matières
 * Contient la logique de réponse (status codes, JSON)
 */

import MatiereModel from "../models/matiere.model.js";

const matierController = {
    /**
     * GET /api/matieres
     * Récupère toutes les matières
     */

    getAll: async (req, res) => {
        try {
            const matieres = await MatiereModel.findAll();

            if (!matieres || matieres.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Listes des matières vide ou matière non trouvé"
                })
            }
            res.status(200).json({
                success: true,
                data: matieres,
                count: matieres.length
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur serveur lors de la récuperation de la liste des matières",
                error: error.message
            })
        }
    },

    /**
     * GET /api/matieres/:codemat
     * Recuperer une matière par son code
     */

    getById: async (req, res) => {
        try {
            const { codemat } = req.params;
            const matiere = await MatiereModel.findById(codemat);

            if (!matiere) {
                return res.status(404).json({
                    success: false,
                    message: "Matière non trouvée"
                })
            }

            res.status(200).json({ success: true, data: matiere })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur serveur lors de la récuperation de la matière",
                error: error.message
            })
        }
    },

    /**
     * POST /api/matieres
     * Crée une nouvelle
     * Body requis : { codemat, libelle, coef }
     */

    create: async (req, res) => {
        try {
            const { codemat, libelle, coef } = req.body;

            if (!codemat || !libelle || !coef) {
                return res.status(400).json({
                    success: false,
                    message: "Tous les champs sont requis: codemat libelle, coef"
                })
            }

            const existing = await MatiereModel.findById(codemat);
            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: 'Ce code matière existe déjà'
                })
            }

            const createdMatiere = await MatiereModel.create({ codemat, libelle, coef })
            if (!createdMatiere) {
                return res.status(404).json({
                    success: false,
                    message: "Matière non créée"
                })
            }

            res.status(201).json({
                success: true,
                message: 'Matière créée avec succès',
                data: createdMatiere
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur serveur lors de la création de la matière",
                error: error.message
            })
        }
    },

    /**
     * PUT /api/matieres/:codemat
     * Modifie une matiere existante
     * Body requis : { libelle, coef }
     */

    update: async (req, res) => {
        try {
            const { codemat } = req.params;
            const { libelle, coef } = req.body;

            const existing = await MatiereModel.findById(codemat);
            if (!existing) {
                return res.status(404).json({
                    success: false,
                    message: 'Matière non trouvée'
                })
            }

            const updatedMatiere = await MatiereModel.update(codemat, { libelle, coef });
            if (!updatedMatiere) {
                return res.status(404).json({
                    success: false,
                    message: "Matière non mis a jour"
                })
            }

            res.status(200).json({
                success: true,
                message: 'Matière modifiée avec succès',
                data: updatedMatiere
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur serveur lors de la modification de la matière",
                error: error.message
            })
        }
    },

    /**
     * DELETE /api/matieres/:codemat
     * Supprime une matiere (les notes sont supprimées automatiquement)
     */

    delete: async (req, res) => {
        try {
            const { codemat } = req.params;

            const existing = await MatiereModel.findById(codemat);
            if (!existing) {
                return res.status(404).json({
                    success: false,
                    message: "Matière non trouvée"
                })
            }

            const deletedMatiere = await MatiereModel.delete(codemat);
            if (!deletedMatiere) {
                return res.status(404).json({
                    success: false,
                    message: "Matière non supprimée"
                })
            }

            res.status(200).json({
                success: true,
                message: "Matière supprimée avec succès"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur serveur lors de la suppression de la matière",
                error: error.message
            })
        }
    }
};

export default matierController;