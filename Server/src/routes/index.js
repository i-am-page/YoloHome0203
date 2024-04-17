const recordRouter = require('./record')
const accountRouter = require('./account')
const RecordController = require('../controllers/RecordController')
const route = (app) => {
    app.use('/record', recordRouter)
    app.use('/account', accountRouter)
    app.get('/statistics', RecordController.Statistics)
}

module.exports = route