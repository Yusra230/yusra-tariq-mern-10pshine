import { body, validationResult } from 'express-validator';
import  AppError from '../utils/errors.js';
import User from '../models/User.js';

// Common validation rules
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
    
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          return next();
        }
    
        // Format errors as string
        const formattedErrors = errors.array().map(err => `${err.path}: ${err.msg}`).join(", ");
    
        // Throw AppError with proper string
        throw new AppError(formattedErrors, 422);
      };
};

// Signup validation
const signupValidation = validate([
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail()
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already exists');
            }
            return true;
        }),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain at least one number'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
]);

// Login validation
const loginValidation = validate([
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
]);

// Update profile validation
const updateProfileValidation = validate([
    body('username')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers and underscores')
        .custom(async (username, { req }) => {
            const existingUser = await User.findOne({ 
                username, 
                _id: { $ne: req.user.id } 
            });
            if (existingUser) {
                throw new Error('Username already exists');
            }
            return true;
        }),

    body('profilePicture')
        .optional()
        .isURL()
        .withMessage('Profile picture must be a valid URL')
]);

export { validate,
    signupValidation,
    loginValidation,
    updateProfileValidation
};