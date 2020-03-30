var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
const stockArray = [1, 90];

app.get('/', function (req, res) {
    res.json({
        "info": 'This is a fake stock price backend!',
        "endpoint": "/api/?symbol=XX",
        "low_price": "use the symbol LO to get a stock price of 1",
        "high_price": "use the symbol HI to get a stock price of 90",
        "random": "use any other symbol to get either 1 or 90"
    });
});

app.get('/api', function (req, res) {
    var symbol = req.query.symbol;
    if ((symbol == undefined) || (symbol.trim() == '')) {
        res.statusCode = 500;
        res.json({
            "error": 'Missing query parameter: symbol'
        });
    }

    res.json({
        "price": {
            "regularMarketOpen": {
                "raw": getRandomStockPrice(symbol)
            }
        }
    });
});

function getRandomStockPrice(symbol) {
    if (symbol.toUpperCase() == 'LO') { return 1 }

    if (symbol.toUpperCase() == 'HI') { return 90 }

    return stockArray[Math.floor(Math.random() * stockArray.length)]; // returns either 1 or 90
}



app.listen(3000, function () {
    console.log('Fake Stock Price API listening on port 3000!');
});