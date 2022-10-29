const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const coinRoutes = require('./src/routes/coin.routes');
const platformRoutes = require('./src/routes/platform.routes');
const productRoutes = require('./src/routes/product.routes');
const purchaseRoutes = require('./src/routes/purchase.routes');

require('dotenv').config();

const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', async(req, res) => {
    res.json({message: 'Hola desde client_server'});
})

app.use('/api/v1/coins', coinRoutes);
app.use('/api/v1/platforms', platformRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/purchases', purchaseRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})