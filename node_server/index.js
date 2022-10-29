const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

require('dotenv').config();

const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', async(req, res) => {
    res.json({message: 'Hola desde node_server'});
})

app.post('/', async (request, response) => {
    let responseMessage = '';
    let body = request.body.data;
    let requestType = request.body.type;
    let endpoint = request.body.endpoint;
    console.log(request.body)
    switch(requestType){
        case 'post':
            await axios.post('http://client_server:3000/api/v1/' + endpoint, body)
                .then(function (response) {
                    responseMessage = response;
                })
                .catch(function (error) {
                    responseMessage = error.response;
                })
            break;
        case 'get':
            await axios.get('http://client_server:3000/api/v1/' + endpoint)
                .then(function (response) {
                    responseMessage = response;
                })
                .catch(function (error) {
                    responseMessage = error.response;
                })
            break;
        case 'put':
            await axios.put('http://client_server:3000/api/v1/' + endpoint, body)
                .then(function (response) {
                    responseMessage = response;
                })
                .catch(function (error) {
                    responseMessage = error.response;
                })
            break;
    }
    response.status(responseMessage.status);
    response.json(responseMessage.data);
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})