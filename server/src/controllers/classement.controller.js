/**
 * classementController.js - Gère le classement des étudiants
 */

import CalculService from "../services/calcul.service.js";
import { NIVEAUX } from "../utils/constants.js";

const classementController = {
        /**
     * GET /api/classement/:niveau
     * Retourne le classement des étudiants d'un niveau donné
     * Trié par moyenne décroissante (meilleur en premier)
     */

    getClassement: async (req, res) => {
        try {
            const { niveau } = req.params;

            // Verifier que le niveau est valide
            const niveauxValides = NIVEAUX; // ['L1', 'L2', 'L3', 'M1', 'M2'];

            if (!niveauxValides.includes(niveau)) {
                return res.status(400).json({
                    success: false,
                    message: `Niveau invalide. Valeurs acceptées: ${niveauxValides.join(', ')}` ,
                })
            }

            const classement = await CalculService.getClassementParNiveau(niveau);

            if (!classement || classement.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: "Aucun classement pour ce niveau"
                })
            }
            res.status(200).json({
                success: true,
                data: classement,
                niveau: niveau,
                count: classement.length
            })
        } catch (error) {
            console.error('Erreur getClassement:', error);
            res.status(500).json({ success: false, message: "Erreur serveur lors de la recuperation du classement pour ce niveau. ", error: error.message})
        }
    }
};

export default classementController;
