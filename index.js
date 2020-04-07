const express = require("express");
const bodyParser = require("body-parser");
const dataStore = require("nedb");
const path = require("path");
const globalSuicidesAPI = require(path.join(__dirname,"global-suicides_API"));

var port = process.env.PORT || 80;
const dbGSuicides = path.join(__dirname,"global-suicides_API/suicides.db");

const app = express();
app.use(bodyParser.json());


app.use("/", express.static("./public"));



const globalSuicidesDb = new dataStore({							//objeto
		filename: dbGSuicides,
		autoload: true
});


globalSuicidesAPI(app, globalSuicidesDb);

const BASE_API_URL = "/api/v1"; //Esta línea debemos copiarla en cada carpeta


/*====================================================*/
/*========= API_Jesús Vázquez Rivadeneyra =========*/
/*====================================================*/

var global_marriages = [
		{"country": "Italy","year": 2018,"marriages": "195,778","avg_wm": 32.4,"avg_m": 35.2},
		{"country": "Belgium", "year": 2017,   "marriages": "44,329",   "avg_wm": 31.2,   "avg_m": 33.5 },
 		{   "country": "México",   "year": 2011,   "marriages": "570,954",  "avg_wm": 26.3,   "avg_m": 29.2 },
 		{   "country": "Portugal",   "year": 2016,   "marriages": "32,399",   "avg_wm": 30.4,   "avg_m": 32.2 },
 		{   "country": "Suiza",   "year": 2018,   "marriages": "40,716",   "avg_wm": 30.5,   "avg_m": 32.9 }
	];


//var copyGlobal_Marriages = global_marriages;

//const BASE_API_URL="/api/v1";   // ESta es la URL base



//LOADINITIALDATA

app.get(BASE_API_URL + "/global-marriages/loadInitialData", (req, res) => {
	global_marriages = [
		{"country": "Italy","year": 2018,"marriages": "195,778","avg_wm": 32.4,"avg_m": 35.2},
		{"country": "Belgium", "year": 2017,   "marriages": "44,329",   "avg_wm": 31.2,   "avg_m": 33.5 },
 		{   "country": "México",   "year": 2011,   "marriages": "570,954",  "avg_wm": 26.3,   "avg_m": 29.2 },
 		{   "country": "Portugal",   "year": 2016,   "marriages": "32,399",   "avg_wm": 30.4,   "avg_m": 32.2 },
 		{   "country": "Suiza",   "year": 2018,   "marriages": "40,716",   "avg_wm": 30.5,   "avg_m": 32.9 }
	];
	res.send(JSON.stringify(global_marriages,null,2));
	//res.sendStatus(200);
});


// FUNCION DEL GET   /marriages/
app.get(BASE_API_URL+"/global-marriages",(req,res) =>{         //Funcion para cuando nos piden un get. Devuelve todos los contactos 
	res.send(JSON.stringify(global_marriages,null,2))
});

// FUNCION DEL GET /marriages/XXXXX

app.get (BASE_API_URL+"/global-marriages/:country/:year", (req, res) =>{
	var country = req.params.country;
	var year = req.params.year;
	
	var filteredCountriesAndYear = global_marriages.filter( (c)=> {
		return (c.country == country && c.year == year );
	});
	
	if(filteredCountriesAndYear.length >=1){
		res.send(filteredCountriesAndYear[0]);
		//res.sendStatus(200,"OK");

	}else{
		res.sendStatus(404, "COUNTRY NOT FOUND")
	}
		
	
});  

// FUNCION DEL POST /marriages
app.post(BASE_API_URL+"/global-marriages",(req,res) =>{  // Coge el cuerpo de la peticion y los añade al array 
	var newMarriage = req.body;
	
	if((newMarriage == "") || (newMarriage.country == null || newMarriage.year ==null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		global_marriages.push(newMarriage); 	
		res.sendStatus(201,"CREATED");
	}
});


//POST incorrecto
app.post(BASE_API_URL + "/global-marriages/:country/:year", (req, res) => {
    res.sendStatus(405, "Forbidden POST");
});

// FUNCION DEL PUT /marriages/XXXX

app.put(BASE_API_URL+"/global-marriages/:country/:year", (req, res) =>{
	
	var country = req.params.country;
	var year = req.params.year;
    var updateMarriages = req.body;
	
	filteredMarriages = global_marriages.filter((c) => {
		return (c.country == country && c.year ==year);
	});

	if(filteredMarriages.length == 0){
		res.sendStatus(404);
		return;
	}
	
	if(!updateMarriages.country || !updateMarriages.year ||!updateMarriages.marriages || !updateMarriages.avg_wm
	   || !updateMarriages.avg_m || updateMarriages.country != country){
                res.sendStatus(400);
		return;
	}
	
	global_marriages = global_marriages.map((c) => {
		if(c.country == updateMarriages.country){
			return updateMarriages;
		}else{
			return c;
		}
		
	});
	res.sendStatus(200);
});


//PUT incorrecto
app.put(BASE_API_URL + "/global-marriages/", (req, res) => {
    res.sendStatus(405, "Forbidden PUT");
});


// FUNCION DEL DELETE /marriages/

app.delete (BASE_API_URL+"/global-marriages", (req, res) =>{
	global_marriages=[]
//	return global_marriages;
	res.sendStatus(200)
	
});  


// FUNCION DEL DELETE /marriages/XXXX

app.delete (BASE_API_URL+"/global-marriages/:country/:year", (req, res) =>{
	var country = req.params.country;
	var year = req.params.year;

	var filteredCountriesAndYear = global_marriages.filter( (c)=> {
		return (c.country != country || c.year !=year);
	});
	
	if(filteredCountriesAndYear.length < global_marriages.length){
		global_marriages=filteredCountriesAndYear;
		res.sendStatus(200)
	}else{
		res.sendStatus(404, "COUNTRY NOT FOUND")
	}
		
	
});  



/*====================================================*/
/*========= Juan Manuel Cortés Alonso =========*/
/*====================================================*/
var divorces = [
	{ 
		country: "Spain",
		year: 2017,
		divorce: 97960,
		crude_rate: 2.1,
		variation: 0
		
	},
	{ 
		country: "Germany",
		year: 2017,
		divorce: 153501,
		crude_rate: 1.9,
		variation: -0.1
	}
];

// GET DIVORCES	

app.get(BASE_API_URL+"/global-divorces", (req,res) =>{
	res.send(JSON.stringify(divorces,null,2));
	console.log("Data sent:"+JSON.stringify(divorces,null,2));
});

//GET globalDivorces  loadInitialData
app.get(BASE_API_URL+"/global-divorces/loadInitialData",(req, res) => {
	divorces = [
		{ 
		country: "Spain",
		year: 2017,
		divorce: 97960,
		crude_rate: 2.1,
		variation: 0
		
	},
	{ 
		country: "Germany",
		year: 2017,
		divorce: 153501,
		crude_rate: 1.9,
		variation: -0.1
	}
	];
	res.send("Ok");
	res.sendStatus(200);
});
// POST DIVORCES

app.post(BASE_API_URL+"/global-divorces",(req,res) =>{
	
	var newDivorce = req.body;
	
	if((newDivorce == "") || (newDivorce.country == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		divorces.push(newDivorce); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE DIVORCES
app.delete(BASE_API_URL+"/global-divorces", (req,res)=>{
	divorces = [];
	res.sendStatus(200, "DELETED")
} );

// GET DIVORCES/XXX

app.get(BASE_API_URL+"/global-divorces/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredDivorces = divorces.filter((d) => {
		return (d.country == country);
	});
	
	
	if(filteredDivorces.length >= 1){
		res.send(filteredDivorces[0]);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
});

// PUT Divorce/XXX
app.put(BASE_API_URL+"/global-divorces/:country", (req,res)=>{
	var country = req.params.country;
	var year = req.params.year;
	
	var updatedDivorce = req.body;
	
	
	if(country!=updatedDivorce.country){
        res.sendStatus(400);
    }else{
        var countryFilter = divorces.filter((c) => {
        return (c.country != country || c.year != year);
        });
		if(countryFilter.length == 0){
		res.sendStatus(404,"DATA NOT FOUND");
		return;
	}
		else{ divorces = divorces.map((c) =>{
			if(c.country == updatedDivorce.country){
			return updatedDivorce;
		}else{
			return c;
		}
		});}
    }	
	res.sendStatus(200);
});
// DELETE Divorce/XXX

app.delete(BASE_API_URL+"/global-divorces/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredDivorces = divorces.filter((d) => {
		return (d.country != country);
	});
	
	
	if(filteredDivorces.length < divorces.length){
		divorces = filteredDivorces;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
	
	
});
//6-f
app.post(BASE_API_URL + "/global-divorces/:country", (req, res) => {
	
    res.sendStatus(405, "NOT ALLOWED(Post/:country)");
});

//6-g
app.put(BASE_API_URL + "/global-divorces", (req, res) => {
	
    res.sendStatus(405, "NOT ALLOWED(Put/global-divorces)");
});


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