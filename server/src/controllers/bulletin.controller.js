/**
 * bulletinController.js - Gère l'affichage des bulletins
 */

import CalculService from '../services/calcul.service.js';

const bulletinController = {
    /**
     * GET /api/bulletins/:ne
     * Retourne le bulletin complet d'un étudiant
     * Avec : informations étudiant, notes, moyenne calculée, observation
     */
    getBulletin: async (req, res) => {
        try {
            const { ne } = req.params;

            // Vérifier si ne est fourni
            if (!ne) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Numéro étudiant requis' 
                });
            }

            const bulletin = await CalculService.getBulletin(ne);

            if (!bulletin) {
                return res.status(404).json({
                    success: false,
                    message: `Étudiant avec numéro ${ne} non trouvé` 
                })
            }

            console.log(`Bulletin trouvé pour ${ne}, moyenne: ${bulletin.moyenne}`);

            res.status(200).json({ success: true, data: bulletin });
        } catch (error) {
            console.error('Erreur getBulletin:', error);
            res.status(500).json({ success: false, message: "Erreur serveur lors de la recuperation du bulletin de l'étudiant. ", error: error.message })
        }
    }
};

export default bulletinController;