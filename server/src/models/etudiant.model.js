
/**
 * etudiantModel.js - Accès à la table etudiant
 * Contient toutes les requêtes SQL concernant les étudiants
 */


import { pool } from "../config/db.js"

const EtudiantModel = {
    /**
     * Récupère tous les étudiants
     * @param {string} niveau - Optionnel : filtre par niveau (L1, L2, L3, M1, M2, 'Tous')
     * @returns {Promise<Array>} Liste des étudiants
     */

    async findAll(niveau = null) {
        let query = `
            SELECT ne, nom, niveau FROM etudiant
        `;

        const params = [];

        // Ajouter un filtre si un niveau spécifique est demandé (et pas 'Tous')
        if (niveau && niveau !== 'Tous') {
            query += `WHERE niveau = ?`;
            params.push(niveau);
        }

        query += `ORDER BY ne ASC`; // akafa atao nom koa

        const [rows] = await pool.query(query, params);

        return rows;
    },

    
    /**
     * Recherche des étudiants par numéro (ne) ou nom
     * @param {string} keyword - Mot-clé à rechercher
     * @returns {Promise<Array>} Étudiants correspondants
     */

    async search(keyword) {
        // LIKE %keyword% signifie "contient le mot-clé"
        const query = `
            SELECT ne, nom, niveau
            FROM etudoant
            WHERE ne LIKE ? OR nom LIKE ? 
            ORDER BY nom ASC
        `;

        const searchTerm = `%${keyword}%`;

        const [rows] = await pool.query(query, [
            searchTerm,
            searchTerm
        ]);

        return rows;
    },

    
    /**
     * Trouve un étudiant par son numéro
     * @param {string} ne - Numéro étudiant (ex: E001)
     * @returns {Promise<Object|null>} Étudiant ou null si non trouvé
     */

    async findById(ne) {
        const query = `
            SELECT ne, nom, niveau
            FROM etudiant
            WHERE ne = ?
        `;

        const [rows] = await pool.query(query, [ne]);

        return rows[0]
    },

    /**
     * Crée un nouvel étudiant
     * @param {Object} etudiant - { ne, nom, niveau }
     * @returns {Promise<Object>} Résultat de l'insertion
     */

    async create(etudiant) {
        const { ne, nom, niveau } = etudiant;

        const query = `
            INSERT INTO etudiant (ne, nom, niveau)
            VALUES (?, ?, ?)
        `;

        const [result] = await pool.query(query, [
            ne,
            nom,
            niveau
        ]);

        return result;
    },

    /**
     * Modifie un étudiant existant
     * @param {string} ne - Numéro de l'étudiant à modifier
     * @param {Object} etudiant - { nom, niveau }
     * @returns {Promise<Object>} Résultat de la mise à jour
     */ 

    async update(ne, etudiant) {
        const { nom, niveau } = etudiant;

        const query = `
            UPDATE etudiant
            SET nom = ?, niveau = ? 
            WHERE ne = ?
        `;

        const [result] = await pool.query(query, [
            nom,
            niveau,
            ne
        ]);

        return result;
    },

    /**
     * Supprime un étudiant (les notes sont supprimées automatiquement grâce à ON DELETE CASCADE)
     * @param {string} ne - Numéro de l'étudiant
     * @returns {Promise<Object>} Résultat de la suppression
     */

    async delete(ne) {
        const query = `
            DELETE FROM etudiant
            WHERE ne = ?
        `;

        const [result] = await pool.query(query, [ne]);

        return result;
    }
}

export default EtudiantModel;