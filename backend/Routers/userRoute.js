const express = require('express');
const { UserRegisterController, UserLoginController, VerifyEmail, UserProfile } = require('../Controllers/userController');
const protect = require('../authMiddleware/authMiddleware');

const router = express.Router();

router.route('/register').post(UserRegisterController);
router.route('/login').post(UserLoginController);
router.route('/verify-email').post(VerifyEmail);
router.route('/profile').post(protect, UserProfile);


module.exports = router;