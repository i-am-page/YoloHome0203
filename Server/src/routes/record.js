const express = require("express");
const router = express.Router()
const RecordController = require('../controllers/RecordController')
const verifyToken = require('../middleware/authMiddleware')


router.get('/', verifyToken, RecordController.Index)
router.post('/store', RecordController.Store)

module.exports = router