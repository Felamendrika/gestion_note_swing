/**
 * calculService.js - Logique métier pour les calculs de notes
 * Ce service est réutilisable par les contrôleurs
 */

import { pool } from "../config/db.js";
import { SEUILS, OBSERVATIONS } from "../utils/constants.js";

const CalculService = {
    /**
     * CAlcule la moyenne d'un etudiant
     * @param {string} ne - numero etudiant
     * @returns {Promise<number>} Moyenne sur 20
     */

    calculerMoyenne: async (ne) => {
        const query = `
            SELECT 
                SUM(n.note * m.coef) as somme_ponderee,
                SUM(m.coef) as somme_coef
            FROM notes n
            JOIN matiere m ON n.codemat = m.codemat
            WHERE n.ne = ? 
        `;

        const [rows] = await pool.query(query, [ne]);

        //SI pas de notes ou somme_coef null, moyenne = 0
        if (!rows[0].somme_coef || rows[0].somme_coef === 0) {
            return 0;
        }

        return parseFloat((rows[0].somme_ponderee / rows[0].somme_coef).toFixed(2));
    },

    /**
     * Détermine l'observation en fonction de la moyenne
     * @param {number} moyenne - Moyenne sur 20
     * @returns {string} 'ADMIS', 'REDOUBLANT' ou 'ÉCHEC'
     */

    getObservation(moyenne) {
        if (moyenne >= SEUILS.ADMISSION) {
            return OBSERVATIONS.ADMIS;
        }
    
        if (moyenne >= SEUILS.REDOUBLANT) {
            return OBSERVATIONS.REDOUBLANT;
        }
    
        return OBSERVATIONS.ECHEC;
    },
    
    /**
     * Récupère le bulletin complet d'un étudiant
     * @param {string} ne - Numéro étudiant
     * @returns {Promise<Object|null>} Bulletin complet ou null
     */

    getBulletin: async (ne) => {
        // Recuperer les infos de l'etudiant
        const [etudiantRows] = await pool.query(
            'SELECT ne, nom, niveau FROM etudiant WHERE ne = ?',
            [ne]
        );

        if (etudiantRows.length === 0) return null;
        const etudiant = etudiantRows[0];

        // Recuperer les notes avec les details des matieres
        const [notesRows] = await pool.query(`
            SELECT 
                m.libelle,
                m.coef,
                n.note,
                (n.note * m.coef) as note_ponderee
            FROM notes n
            JOIN matiere m ON n.codemat = m.codemat
            WHERE n.ne = ?
            ORDER BY m.libelle
        `, [ne]);

        // Claculer la moyenne
        let sommePonderee = 0;
        let sommeCoef = 0;

        for (const note of notesRows) {
            sommePonderee += parseFloat(note.note_ponderee);
            sommeCoef += parseFloat(note.coef);
        }

        const moyenne = sommeCoef > 0 ? parseFloat((sommePonderee / sommeCoef).toFixed(2)) : 0;
        const observation = CalculService.getObservation(moyenne);

        return {
            etudiant: {
                ne: etudiant.ne,
                nom: etudiant.nom,
                niveau: etudiant.niveau
            },
            notes: notesRows.map(n => ({
                libelle: n.libelle,
                coef: parseInt(n.coef),
                note: parseFloat(n.note),
                note_ponderee: parseFloat(n.note_ponderee)
            })),
            moyenne: moyenne,
            observation: observation
        };
    },

    /**
     * Récupère le classement des étudiants par niveau
     * @param {string} niveau - L1, L2, L3, M1, M2
     * @returns {Promise<Array>} Classement trié par moyenne décroissante
     */

    getClassementParNiveau : async (niveau) => {
        // Recup tous les etudiants du niveau
        const [etudiants] = await pool.query(
            'SELECT ne, nom FROM etudiant WHERE niveau = ?',
            [niveau]
        );

        // Calculer la moyenne pourchaque etudiant
        const classement = [];
        for (const etudiant of etudiants) {
            const moyenne = await CalculService.calculerMoyenne(etudiant.ne);
            classement.push({
                ne: etudiant.ne,
                nom: etudiant.nom,
                moyenne: moyenne
            })
        }

        // Trier par moyenne decroissante (du meilleur au moins bon)
        classement.sort((a, b) => b.moyenne - a.moyenne);

        return classement;
    }
};

export default CalculService;
