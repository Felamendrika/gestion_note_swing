import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    })

    const dbName = process.env.DB_NAME;

// CREATION DE LA BASE DE DONNEES
    await connection.query(`
        CREATE DATABASE IF NOT EXISTS \`${dbName}\`
    `);

    // utiliser db
    await connection.query(`
        USE \`${dbName}\`
    `)

    // CREATION TABLE
    await connection.query(`
        CREATE TABLE IF NOT EXISTS etudiant (
            ne VARCHAR(10) PRIMARY KEY,
            nom varchar(100) NOT NULL,
            niveau ENUM('L1', 'L2', 'L3', 'M1', 'M2') NOT NULL
        );
    `)

    await connection.query(`
        CREATE TABLE IF NOT EXISTS matiere (
            codemat VARCHAR(10) PRIMARY KEY,
            libelle VARCHAR(100) NOT NULL,
            coef INT NOT NULL CHECK (coef >= 1 AND coef <= 10)
        );
    `)

    await connection.query(`
        CREATE TABLE IF NOT EXISTS notes (
            ne VARCHAR(10),
            codemat VARCHAR(10),
            note DECIMAL(4,2) NOT NULL CHECK (note >= 0 AND note<= 20),
            PRIMARY KEY (ne, codemat),
            FOREIGN KEY (ne) REFERENCES etudiant(ne) ON DELETE CASCADE,
            FOREIGN KEY (codemat) REFERENCES matiere(codemat) ON DELETE CASCADE
        );
    `);

    console.log("Base de données initialisée")
}