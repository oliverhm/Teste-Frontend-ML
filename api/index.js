var express = require("express");
var app = express();

const cors = require("cors");
app.use(cors());

const apiHelper = require('./api-helper');
const port = 3000;

const API_ML = 'https://api.mercadolibre.com';
const ENDPOINT_ITEMS = `${API_ML}/items`;
const ENDPOINT_SITES = `${API_ML}/sites/MLA`;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/api/items", async (req, res) => {
  try {
    const query = req.query.q;
    const response = await apiHelper.callAPI(`${ENDPOINT_SITES}/search?q=${query}`);
    const items = [];

    response.results.forEach(element => {
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

    const data = {
      author: {
        name: "First Name",
        lastname: "Last Name"
      },
      categories: ['String', 'String', 'String'],
      items: items
    };

    res.status(200).send(data);
  } catch (err) {
    genericError(err, res);
  }
});

app.get("/api/items/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const item = await apiHelper.callAPI(`${ENDPOINT_ITEMS}/${id}`);
    const price = formatPrice(item.price);
    const data = {
      author: {
        name: "Oliver Henrique",
        lastname: "Maceira",
      },
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Number(price[0]),
          decimals: Number(price[1]),
        },
        picture: item.pictures[0].secure_url,
        condition: item.condition,
        free_shipping: false,
        sold_quantity: item.sold_quantity,
        description: ''
      }
    };

    const description = await apiHelper.callAPI(`${API_ITEMS}/${id}/description`);
    data.item.description = description.plain_text;

    res.status(200).send(data);
  } catch (err) {
    genericError(err, res);
  }
});

function formatPrice(price) {
  const priceStr = price.toString();
  return priceStr.split(".");
};

function genericError(err, res) {
  console.error(err);
  res.status(500).send(err);
}