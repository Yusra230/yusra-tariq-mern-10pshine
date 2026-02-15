// routes/authRoutes.js
import express from 'express';
const authRouter = express.Router();

import rateLimit from 'express-rate-limit';
import {changePassword, forgotPassword, resetPassword, signup, verifyResetCode} from '../controllers/authController.js'
import {login } from '../controllers/authController.js'
import {refreshToken } from '../controllers/authController.js'
import { protect } from'../middleware/auth.js';
import {
    signupValidation,
    loginValidation,
    updateProfileValidation,
} from '../middleware/validation.js';

// Rate limiting for auth routes (important for security)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per window
    message: {
        success: false,
        message: 'Too many attempts, please try again after 15 minutes'
    }
});

// =========== PUBLIC ROUTES ===========
authRouter.post('/signup', authLimiter, signupValidation, signup);
authRouter.post('/login', authLimiter, loginValidation, login);
authRouter.post('/refresh-token', refreshToken);
// authRouter.post('/logout', authController.logout);

// =========== PROTECTED ROUTES ===========
// authRouter.get('/me', protect, authController.getCurrentUser);
// authRouter.put('/profile', protect, updateProfileValidation, authController.updateProfile);
authRouter.put('/change-password', protect,changePassword);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-reset-code", verifyResetCode);
authRouter.post("/reset-password", resetPassword);
export default authRouter;