
const express = require('express')
const cors = require('cors')
const route = require('./src/routes')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
route(app)


const PORT = 8080;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});