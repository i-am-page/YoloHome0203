//require('dotenv').config()
const express = require('express')
const cors = require('cors')
const route = require('./src/routes')

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
route(app)


const PORT = 8080;
const HOST = '192.168.0.105'

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});