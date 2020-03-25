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

// 5-b
//GET globalSuicides  /api/v1/global-suicides/loadInitialData FUNCIONA
app.get(BASE_API_URL+"/global-suicides/loadInitialData",(req, res) => {
	globalSuicides = [
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
	res.sendStatus(200,"OK");
});

// 6-a
//GET globalSuicides  /api/v1/global-suicides FUNCIONA
app.get(BASE_API_URL+"/global-suicides",(req, res) => {
	res.send(JSON.stringify(globalSuicides,null,2));
});


//6-b
//POST globalSuicides crea un nuevo recurso
app.post(BASE_API_URL+"/global-suicides",(req,res) =>{
	
	var newGlobalSuicides = req.body;
	
	if((newGlobalSuicides == "") || (newGlobalSuicides.province == null)){
		res.sendStatus(400,"BAD REQUEST(Resource empty or null)");
	} else {
		tourism.push(newTourism); 	
		res.sendStatus(201,"CREATED");
	}
});


//6-c
//GET globalSuicides  /api/v1/global-suicides/xxx devuelve ese recurso
app.get(BASE_API_URL+"/global-suicides/:country", (req,res)=>{
	console.log("ENTRA.");
	var country = req.params.country;
	
	var countryFilter = globalSuicides.filter((c) => {
		return (c.country == country);
	});
	
	
	if(countryFilter.length >= 1){
		res.send(countryFilter[0]);
		res.sendStatus(200,"OK");
		console.log("LO HA ENCONTRADO");
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
		console.log("NO HAY");
	}
});

//6-d
//DELETE globalSuicides  /api/v1/global-suicides/xxx borra ese recurso


//6-e
//PUT globalSuicides  /api/v1/global-suicides/xxx actualiza ese recurso


//6-f
//POST globalSuicides  /api/v1/global-suicides/xxx debe dar un error de método no permitido.
app.post(BASE_API_URL + "/global-suicides/:country", (req, res) => {//REVISAR FORMATO DE URL
	
    res.sendStatus(405, "NOT ALLOWED(Post/:country)");
});


//6-g
//PUT globalSuicides  /api/v1/global-suicides debe dar un error de método no permitido.
app.put(BASE_API_URL + "/global-suicides", (req, res) => {
	
    res.sendStatus(405, "NOT ALLOWED(Put)");
});

//6-h
//DELETE globalSuicides  /api/v1/global-suicides borra todos los recursos
app.delete(BASE_API_URL + "/global-suicides", (req,res)=>{
	
	globalSuicides = [];
	
	res.sendStatus(200,"OK(Deleted)");
});

/*====================================================*/
/*========= API_Jesús Vázquez Rivadeneyra =========*/
/*====================================================*/



/*====================================================*/
/*========= Juan Manuel Cortés Alonso =========*/
/*====================================================*/



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