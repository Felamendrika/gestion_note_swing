// =============================
// NIVEAUX UNIVERSITAIRES
// =============================

export const NIVEAUX = [
    "L1",
    "L2",
    "L3",
    "M1",
    "M2"
] 

// =============================
// OBSERVATIONS BULLETIN
// =============================
export const OBSERVATIONS = {
    ADMIS: "ADMIS",
    REDOUBLANT: "REDOUBLANT",
    ECHEC: "ECHEC"
};

// =============================
// SEUILS MOYENNES
// =============================
export const SEUILS = {
    ADMISSION: 10,
    REDOUBLANT: 7.5
};

// =============================
// MESSAGES API
// =============================

export const API_MESSAGES = {

    // Etudiants
    STUDENT_CREATED: "Étudiant créé avec succès",
    STUDENT_UPDATED: "Étudiant modifié avec succès",
    STUDENT_DELETED: "Étudiant supprimé avec succès",
    STUDENT_NOT_FOUND: "Étudiant introuvable",

    // Matieres
    SUBJECT_CREATED: "Matière créée avec succès",
    SUBJECT_MODIFIED: "Matière modifiée avec succès",
    SUBJECT_DELETED: "Matière supprimée avec succès",
    SUBJECT_NOT_FOUND: "Matière introuvable",

    // Notes
    GRADE_CREATED: "Note ajoutée avec succès",
    GRADE_MODIFIED: "Note modifiée avec succès",
    GRADE_DELETED: "Note supprimée avec succès",
    GRADE_NOT_FOUND: "Note introuvable",

    // server
    SERVER_ERROR: "Erreur interne du serveur",
    INVALID_DATA: "Données invalides",

}

    // =============================
    // CODES HTTP
    // =============================
export const HTTP_STATUS = {
    OK: 200,
    CREATE: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}
