const express = require("express");
const restaurantList = require("./restaurant.json").results;
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { restaurantdata: restaurantList });
});

app.get("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  const restaurantdata = restaurantList.find(
    (data) => data.id === Number(restaurantId)
  );
  res.render("show", { restaurantdata });
});

app.get("/search", (req, res) => {
    const keywords = req.query.keywords;
    const keyword = req.query.keywords.trim().toLowerCase();
  const filteredRes = restaurantList.filter((rest) => 
    rest.name.toLowerCase().includes(keyword) ||
      rest.category.includes(keyword)
  );
  console.log(filteredRes);
  res.render("index", { restaurantdata: filteredRes, keywords });
});

app.listen(port, () => {
  console.log("running on port 3000");
});
