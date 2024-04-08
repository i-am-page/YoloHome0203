const recordRouter = require('./record')
const accountRouter = require('./account')

const route = (app) => {
    app.use('/record', recordRouter)
    app.use('/account', accountRouter)
}

module.exports = route