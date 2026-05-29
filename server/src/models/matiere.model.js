/**
 * matiereModel.js - Accès à la table matiere
 * Contient toutes les requêtes SQL concernant les matiere
 */

import { pool } from "../config/db.js";

const MatiereModel = {
    /**
    * Récupère toutes les matières
    * @returns {Promise<Array>} Liste des matières
     */

    async findAll () {
        const query = `
            SELECT codemat, libelle, coef
            FROM matiere
            ORDER BY libelle 
        `;

        const [rows] = await pool.query(query);

        return rows;
    },

    /**
     * Trouve une matière par son code
     * @param {string} codemat - Code matière (ex: MATH01)
     * @returns {Promise<Object|null>}
     */

    async findById(codeMat) {
        const query = `
            SELECT codemat, libelle, coef
            FROM matiere
            WHERE codemat = ? 
        `;

        const [rows] = await pool.query(query, [codeMat]);

        return rows[0] || null;
    },
    
    /**
     * Crée une nouvelle matière
     * @param {Object} matiere - { codemat, libelle, coef }
     */

    async create(matiere) {
        const { codemat, libelle, coef } = matiere;

        const query = `
            INSERT INTO matiere (codemat, libelle, coef)
            VALUES (?, ?, ?)
        `;

        const [result] = await pool.query(query, [
            codemat,
            libelle,
            coef
        ]);

        return result;
    },

    /**
     * Modifie une matière
     * @param {string} codemat - Code de la matière
     * @param {Object} matiere - { libelle, coef }
     */

    async update(codemat, matiere) {
        const { libelle, coef } = matiere;

        const query = `
            UPDATE matiere
            SET libelle = ?, coef = ?
            WHERE codemat = ? 
        `;

        const [result] = await pool.query(query, [
            libelle,
            coef,
            codemat
        ]);

        return result;
    },

    /**
     * Supprime une matière (les notes associées sont supprimées grâce à ON DELETE CASCADE)
     */

    async delete(codemat) {
        const query = `
            DELETE FROM matiere
            WHERE codemat = ?
        `;

        const [result] = await pool.query(query, [codemat])

        return result;
    }

}

export default MatiereModel;