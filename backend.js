const express = require("express");
const cors = require("cors");
const app = express();
const citydata = require("./DATA.json");

app.use(cors());
// Endpoint to get all city data
app.get("/cities", (req, res) => {
  try {
    res.json(citydata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/cities/:cityName", (req, res) => {
  const city = req.params.cityName;
  const data = citydata.find(
    (item) => item.city.toLowerCase() === city.toLowerCase()
  );

  if (data) {
    res.json(data);
  } else {
    res
      .status(404)
      .json({ message: "Data Not Found, we will update it shortly" });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
