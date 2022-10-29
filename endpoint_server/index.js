const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const cors = require('cors');

require('dotenv').config();

const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors({
    origin: '*'
}));

app.get('/', async(req, res) => {
    res.json({message: 'Hola desde endpoint_server'});
})

app.post('/', async (request, response) => {
    let responseMessage = ''
    await axios.post('http://loadbalancer:8080/', request.body)
        .then(function (response) {
            responseMessage = response;
        })
        .catch(function (error) {
            console.log(error);
            responseMessage = error.response;
        })
    response.status(responseMessage.status);
    response.json(responseMessage.data);
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})