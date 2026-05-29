/**
 * etudiantController.js - Gère les requêtes HTTP pour les étudiants
 * Contient la logique de réponse (status codes, JSON)
 */

import EtudiantModel from '../models/etudiant.model.js';

const etudiantController = {
    /**
     * GET /api/etudiants
     * Récupère tous les étudiants (avec filtres optionnels)
     * Query params possibles : ?niveau=L3&q=recherche
     */
    getAll: async (req, res) => {
        try {
            const { niveau, q } = req.query;

            let etudiants;
            if (q) {
                // Recherche par mot -cle numero ou nom
                etudiants = await EtudiantModel.search(q);
            } else {
                // Filtrer par niveau ou tous
                etudiants = await EtudiantModel.findAll(niveau)
            }

            res.status(200).json({
                success: true,
                data: etudiants,
                count: etudiants.length
            })

        } catch (error) {
            console.error('Erreur getAll: ', error);
            res.status(500).json({ success: false, message: error.message })
        }
    },

    search: async (req, res) => {
        try {

            const { keyword } = req.params;

            const students = await EtudiantModel.search(keyword);

            res.status(200).json(students);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Erreur serveur"
            });

        }
    },

    /**
     * GET /api/etudiants/:ne
     * Recuperer un etudiant par son numero
     */
    getById: async (req, res) => {
        try {
            const { ne } = req.params;
            const etudiant = await EtudiantModel.findById(ne);

            if (!etudiant) {
                return res.status(404).json({
                    success: false,
                    message: 'Étudiant non trouvé'
                })
            }

            res.status(200).json({ success: true, data: etudiant })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },

    /**
     * POST /api/etudiants
     * Crée un nouvel étudiant
     * Body requis : { ne, nom, niveau }
     */
    create: async (req, res) => {
        try {
            const { ne, nom, niveau } = req.body;

            // Validation es champs
            if (!ne || !nom || !niveau) {
                return res.status(400).json({
                    success: false,
                    message: "Tous les champs sont requis : ne, nom, niveau"
                })
            }

            // Verifier si l'etudiant existe deja
            const existing = await EtudiantModel.findById(ne);

            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: 'Ce numéro étudiant existe déjà'
                })
            }

            const newEtudiant = await EtudiantModel.create({ ne, nom, niveau });

            if (!newEtudiant) {
                return res.status(404).json({
                    success: false,
                    message: "Étudiant non créé"
                })
            }
            res.status(201).json({
                success: true,
                data: newEtudiant,
                message: 'Étudiant créé avec succès'
            })
        } catch (error) {
            res.status(500).json({ success: false, message: "Erreur serveur lors de l'ajout de l'étudiant", error: error.message})
        }
    },

    /**
     * PUT /api/etudiants/:ne
     * Modifie un étudiant existant
     * Body requis : { nom, niveau }
     */
    update: async (req, res) => {
        try {
            const { ne } = req.params;
            const { nom, niveau } = req.body;

            console.log(`Modification étudiant ${ne}: nom=${nom}, niveau=${niveau}`);

            // Verifier si l'etudiant existe
            const existing = await EtudiantModel.findById(ne);
            if (!existing) {
                console.log("Etudiant non trouvee")
                return res.status(404).json({
                    success: false,
                    message: 'Étudiant non trouvé'
                })
            }

            const updatedEtudiant = await EtudiantModel.update(ne, { nom, niveau });

            console.log(`✅ Étudiant ${ne} modifié avec succès`);

            if (!updatedEtudiant) {
                console.log("Etudiant non modifie")

                res.status(404).json({
                    success: false,
                    message: 'Étudiant non modifié'
                })
            }

            res.status(200).json({
                success: true,
                message: 'Étudiant modifié avec succès',
                data: updatedEtudiant
            })
        } catch (error) {
            console.error('❌ Erreur update:', error);
            res.status(500).json({
                success: false,
                message: "Erreur serveur lors de la mise a jour de l'étudiant",
                errorr: error.message
            })
        }
    },

    /**
     * DELETE /api/etudiants/:ne
     * Supprime un étudiant (ses notes sont supprimées automatiquement)
     */
    delete: async (req, res) => {
        try {
            const { ne } = req.params;

            const existing = await EtudiantModel.findById(ne);
            if (!existing) {
                return res.status(404).json({
                    success: false,
                    message: "Étudiant non trouvé"
                })
            }

            const deletedEtudiant = await EtudiantModel.delete(ne);

            if (!deletedEtudiant) {
                res.status(404).json({
                    success: false,
                    message: "Étudiant non supprimé"
                })
            }

            res.status(200).json({
                success: true,
                message: "Étudiant supprimé avec succès"
            })
        } catch (error) {
            res.status(500).json({ success: false, message: "Erreur serveur lors de la suppression de l'étudiant", error: error.message });
        }
    }

};

export default etudiantController;