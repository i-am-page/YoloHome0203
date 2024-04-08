const express = require("express");
const router = express.Router()
const AccountController = require('../controllers/AccountController')

//router.get('/login', AccountController.Index)
router.post('/login', AccountController.Login)

module.exports = router