/**
 * noteModel.js - Accès à la table etudiant
 * Clé primaire composite : (ne, codemat)
 * Contient toutes les requêtes SQL concernant les notes
 */

import { pool } from "../config/db.js";

const NoteModel = {
    /**
     * Récupère toutes les notes (avec les noms étudiants et libellés matières)
     * @param {string|null} ne - Optionnel : filtrer par étudiant
     * @returns {Promise<Array>}
     */

    async findAll(ne = null) {
        let query = `
            SELECT
                n.ne,
                e.nom AS etudiant_nom,
                n.codemat,
                m.libelle AS matiere_libelle,
                n.note
            FROM notes n
            INNER JOIN etudiant e ON n.ne = e.ne
            INNER JOIN matiere m ON n.codemat = m.codemat
        `;

        const params = [];

        if (ne) {
            query += ` WHERE n.ne = ?`;
            params.push(ne);
        }

        query += ` ORDER BY e.nom ASC`;

        const [rows] = await pool.query(query, params);

        return rows;
    },
    
    /**
     * Trouve une note spécifique (étudiant + matière)
     * @param {string} ne - Numéro étudiant
     * @param {string} codemat - Code matière
     */

    async findOne(ne, codemat) {
        const query = `
            SELECT ne, codemat, note 
            FROM notes
            WHERE ne = ? AND codemat = ?
        `;

        const [rows] = await pool.query(query, [
            ne, 
            codemat
        ])

        return rows[0] || null;
    },

    /**
     * Crée une nouvelle note
     * @param {Object} note - { ne, codemat, note }
     */

    async create(note) {
        const { ne, codemat, note: valeur } = note;

        // Vérification que la note n'est pas undefined
        if (valeur === undefined || valeur === null) {
            throw new Error('La note ne peut pas être null');
        }

        const query = `
            INSERT INTO notes (ne, codemat, note)
            VALUES (?, ?, ?)
        `;

        const [result] = await pool.query(query, [
            ne, 
            codemat,
            valeur
        ]);

        return result;
    },

    async update(ne, codemat, note) {
        const query = `
            UPDATE notes
            SET note = ?
            WHERE ne = ? AND codemat = ?
        `;

        const [result] = await pool.query(query, [
            note,
            ne,
            codemat
        ]);

        return result;
    },

    async delete(ne, codemat) {
        const query = `
            DELETE FROM notes
            WHERE ne = ? AND codemat = ? 
        `;

        const [result] = await pool.query(query, [
            ne,
            codemat
        ]);

        return result;
    }

};

export default NoteModel;