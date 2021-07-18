const express  = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home");
});



app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});
app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey = "23f3dcc9b3e53aa32acc52768e02921d";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+query+"&units="+units;
  https.get(url,function(response){
    if(response.statusCode===200){

    response.on("data",function(data){

      const weatherData  = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description
      const link = "http://openweathermap.org/img/wn/"
      const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon +"@2x.png"
      res.render("output",{
        weatherData : weatherData,
        temp : temp,
        description : description,
        icon : icon,
        link : link,
        query: query
      });

    })
  }

    else{
      res.redirect("/");
    }
  })
});











app.listen(process.env.PORT || 3000,function(){
  console.log("Server is hosted at 3000");
})
