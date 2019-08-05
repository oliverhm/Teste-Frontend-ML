var express = require("express");
var app = express();
const cors = require("cors");
app.use(cors());

const apiHelper = require('./api-helper');
const port = 3000;

app.listen(port, () => {
 console.log("Server running on port 3000");
});

app.get("/api/items", (req, res) => {
  const query = req.query.q;

  apiHelper.callAPI(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
    .then(response => {
      const results = response.results;
      const items = [];

      results.forEach(element => {
        const priceStr = element.price.toString();
        const price = priceStr.split(".");

        items.push({
          id: element.id,
          title: element.title,
          price: {
            currency: element.currency_id,
            amount: Number(price[0]),
            decimals: Number(price[1])
          },
          address: {
            state_id: element.address.state_id,
            state_name: element.address.state_name,
          },
          picture: element.thumbnail,
          condition: element.condition,
          free_shipping: element.shipping.free_shipping
        });
      });

      res.json({
        author: {
          name: "Oliver Henrique",
          lastname: "Maceira"
        },
        categories: ['oi', 'oi', 'oi'],
        items: items
      });
    })
    .catch(error => {
      res.send(error)
    });
});