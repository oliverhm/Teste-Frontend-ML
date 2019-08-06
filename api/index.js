var express = require("express");
var app = express();

const cors = require("cors");
app.use(cors());

const apiHelper = require('./api-helper');
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/api/items", (req, res) => {
  const query = req.query.q;

  apiHelper.callAPI(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
    .then(response => {
      const results = response.results;
      const items = [];

      results.forEach(element => {
        const price = formatPrice(element.price);

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
        categories: ['category 1', 'category 2', 'category 3'],
        items: items
      });
    })
    .catch(error => {
      res.send(error);
    });
});

app.get("/api/items/:id", (req, res) => {
  const id = req.params.id;

  apiHelper.callAPI(encodeURI(`https://api.mercadolibre.com/items/${id}`))
    .then(response => {
      const price = formatPrice(response.price);

      res.json({
        author: {
          name: "Oliver Henrique",
          lastname: "Maceira",
        },
        item: {
          id: response.id,
          title: response.title,
          price: {
            currency: response.currency_id,
            amount: Number(price[0]),
            decimals: Number(price[1]),
          },
          picture: response.pictures[0].secure_url,
          condition: response.condition,
          free_shipping: false,
          sold_quantity: response.sold_quantity,
          description: 'mimimim'
        }
      });
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    });
});

function formatPrice(price) {
  const priceStr = price.toString();
  return priceStr.split(".");
};