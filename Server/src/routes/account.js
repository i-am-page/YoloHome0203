const express = require("express");
const router = express.Router()
//const AccountController = require('../controllers/AccountController')
const AuthController = require('../controllers/AuthController')
const verifyToken = require('../middleware/authMiddleware');

router.get('/protected', verifyToken, (req, res) => {
    res.send('Access granted: You are authenticated');
});

// Authentication routes
router.post('/register', AuthController.register);
router.post('/authenticate', AuthController.authenticate);



module.exports = router