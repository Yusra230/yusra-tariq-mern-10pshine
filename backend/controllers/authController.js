// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import crypto from "crypto";
import { generateToken, verifyToken } from '../utils/jwt.js'
import { generatePasswordResetToken } from "../utils/passwordReset.js";
import { sendVerificationEmail } from '../utils/email.js';
// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;
  
      // 1. Check if all fields are provided
      if (!email || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'Email, password and confirmPassword are required'
        });
      }
  
      // 2. Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'Passwords do not match'
        });
      }
  
      // 3. Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists'
        });
      }
  
      // 4. Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // 5. Create user
      const user = await User.create({
        email,
        password: hashedPassword
      });
  
      // 6. Generate JWT token
      const token = generateToken(user._id);
  
      // 7. Prepare response without password
      const userResponse = {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
      };
  
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: userResponse
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };
  
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // ✅ Update  lastLogin
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        // Prepare user response
        const userResponse = {
            id: user._id,
            email: user.email,
            lastLogin: user.lastLogin
        };

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: userResponse
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        const { username, profilePicture } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { username, profilePicture },
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// @desc    Refresh token (simplified for internship)
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshToken = async (req, res) => {
    try {
        // In a real app, validate refresh token
        // For internship, we'll keep it simple
        res.status(200).json({
            success: true,
            message: 'Token refresh endpoint'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
export const logout = (req, res) => {
    // JWT is stateless, so logout is client-side
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email does not exist" });
    }

    // Generate 6-digit numeric verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // e.g., 123456
    const hashedCode = crypto
      .createHash("sha256")
      .update(String(verificationCode))
      .digest("hex");

    // Save hashed code and expiry in DB
    user.resetPasswordToken = hashedCode;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    // Send verification code via email
    await sendVerificationEmail(user.email, verificationCode);

    res.json({
      success: true,
      message: "Verification code sent to your email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
  
export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

  const user = await User.findOne({
    email,
    resetPasswordToken: hashedCode,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ success: false, message: "Code invalid or expired" });
  }

  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  console.log(user);
  await user.save();

  res.json({ success: true, message: "Password reset successful" });
};

  
  // controllers/authController.js
export const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedCode = crypto.createHash("sha256").update(String(code)).digest("hex");

    if (hashedCode !== user.resetPasswordToken) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "Verification code expired" });
    }

    res.json({ success: true, message: "Code verified, you can now reset password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
