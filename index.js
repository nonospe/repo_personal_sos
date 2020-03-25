const express = require("express");
const bodyParser = require("body-parser");

var app = express();

var port = process.env.PORT || 80;

app.use("/", express.static("./public"));

app.use(bodyParser.json());

const BASE_API_URL = "/api/v1";

/*====================================================*/
/*========= API_ANTONIO_JOSE_JIMENEZ_SEGOVIA =========*/
/*====================================================*/
var globalSuicides = [
	{
		country: "Croatia",
		lengthCoord: 15.977979,
		latitudeCoord: 45.8144417,
		year: 2003,
		men: 31.4,
		women: 8.4,
		average: 19.5
	},
	{
		country: "Serbia",
		lengthCoord: 20.4651299,
		latitudeCoord: 44.8040085,
		year: 2002,
		men: 28.8,
		women: 10.4,
		average: 19.3
	}	,
	{
		country: "Belgium",
		lengthCoord: 4.3487802,
		latitudeCoord: 50.8504486,
		year: 2009,
		men: 28.7,
		women: 10.9,
		average: 18.9
	}	,
	{
		country: "South Korea",
		lengthCoord: 126.9784012,
		latitudeCoord: 37.5660019,
		year: 2012,
		men: 38.2,
		women: 18.0,
		average: 28.1
	}	,
	{
		country: "Latvia",
		lengthCoord: 24.1058903,
		latitudeCoord: 56.9459991,
		year: 2004,
		men: 42.9,
		women: 8.5,
		average: 24.3
	}	
];




/*====================================================*/
/*================== WEB_SERVER_TIME ================*/
/*===================================================*/
app.get("/time", (request, response) => {
	response.send("<html>"+new Date()+"</html>");
});

app.listen(port, () => {
	console.log("Server ready.");
});

console.log("Loading Server...");
console.log(new Date());