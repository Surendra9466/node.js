const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const place = req.body.cityInput;
   
    const apiKey = "41d20f91cc245a1574fa51bb3ae601b1";
   
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+ place +"&appid="+ apiKey +"&units=metric";

    https.get(url,(response)=>{

       response.on("data",(data)=>{
           
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const conditionIcon = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            const temp = weatherData.main.temp;
            res.write("<h1>The temperature in "+place +" is "+temp+"`C</h1>");
            res.write("<p>Weather is "+weatherDescription+"</p>");
            res.write("<img src="+ conditionIcon +">");
            res.send();
            })
     })

})

app.listen(3000,()=>{
    console.log("Server is Up and running");
})