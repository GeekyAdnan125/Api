const express = require('express');
const app = express();
const cors=require("cors");
const port = process.env.PORT || 2000;
const citydata = require("./DATA.json");

app.use(cors());
// Endpoint to get all city data
app.get("/users", (req, res) => {
    try {
        res.json(citydata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Endpoint to get data for a specific city
app.get("/users/:cityName", (req, res) => {
    const city = req.params.cityName;
    const data = citydata.find(item => item.city.toLowerCase() === city.toLowerCase());

    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ message: 'Data Not Found, we will update it shortly' });
    }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
