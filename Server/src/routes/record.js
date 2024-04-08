const express = require("express");
const router = express.Router()
const RecordController = require('../controllers/RecordController')

router.get('/', RecordController.Index)
router.post('/store', RecordController.Store)

module.exports = router