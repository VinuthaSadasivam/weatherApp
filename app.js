const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = express();
const https = require("https");
const bodyParser = require("body-parser");
port.use(bodyParser.urlencoded({extended: true}));
port.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
   
});
port.post("/", function(req, res){
     const query = req.body.cityName;
    const unit = "metric";
    apiKey = process.env.API_KEY;
    const url = process.env.URL_FIRST + query + process.env.URL_SECOND + unit + process.env.URL_THIRD + apiKey;
    https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "https://openweathermap.org/img/wn/" + icon  + "@2x.png";
        
        
        res.write("<h1>the temperature in " + query + " is " +  temp +  " degree celcius</h1>");
        res.write("<p>the weather is " + weatherDescription +  " </p>");
        res.write("<img src=" + imageUrl + ">");
        res.send();
    });
    });
})
port.listen(3000, function(req, res){
    console.log("the server has started");
});