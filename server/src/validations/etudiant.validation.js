import { body } from 'express-validator';

export const etudiantValidation = [
    body('ne')
        .notEmpty()
        .withMessage("Numéro obligatoire"),

    body('nom')
        .notEmpty()
        .withMessage("Nom obligatoire"),

    body('niveau')
        .isIn(['L1', "L2", "L3", "M1", "M2"])
]