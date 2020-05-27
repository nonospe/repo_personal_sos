module.exports = function init(app){

//const cool = require("cool-ascii-faces");
const dataStore = require("nedb");
const path = require("path");
const dbGSuicides = path.join(__dirname,"./suicides.db");
const request = require('request');
const express = require("express");

	const globalSuicidesDb = new dataStore({							//objeto
		filename: dbGSuicides,
		autoload: true
	});
	
	const BASE_API_URL = "/api/v2";
	
	console.log("Cargando modulo... global-suicides_API");
	
		
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
		country: "South_Korea",
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
	}		,
	{
		country: "Argentina",
		lengthCoord: -58.3772316,
		latitudeCoord: -34.6131516,
		year: 2015,
		men: 23.7,
		women: 4.8,
		average: 14.2
	}		,
	{
		country: "Hong_Kong",
		lengthCoord: 116.3972300,
		latitudeCoord: 39.9075000,
		year: 2011,
		men: 10.6,
		women: 13.8,
		average: 12.2
	}		,
	{
		country: "Denmark",
		lengthCoord: 12.5655298,
		latitudeCoord: 55.6759415,
		year: 2000,
		men: 20.2,
		women: 7.2,
		average: 13.6
	}		,
	{
		country: "Canada",
		lengthCoord: -75.6981201,
		latitudeCoord: 45.411171,
		year: 2001,
		men: 18.7,
		women: 5.2,
		average: 11.9
	}		,
	{
		country: "Ireland",
		lengthCoord: -6.2488899,
		latitudeCoord: 53.3330612,
		year: 2001,
		men: 21.4,
		women: 4.1,
		average: 12.7
	}		,
	{
		country: "Cuba",
		lengthCoord: -82.3830400,
		latitudeCoord: 23.1330200,
		year: 2008,
		men: 19.0,
		women: 5.5,
		average: 12.3
	}		,
	{
		country: "India",
		lengthCoord: 77.2314911,
		latitudeCoord: 28.6519508,
		year: 1998,
		men: 12.2,
		women: 9.1,
		average: 10.7
	}		,
	{
		country: "Brazil",
		lengthCoord: -47.9297218,
		latitudeCoord: -15.7797203,
		year: 2008,
		men: 7.7,
		women: 2.0,
		average: 4.8
	}		,
	{
		country: "Romania",
		lengthCoord: 26.1062603,
		latitudeCoord: 44.432251,
		year: 2009,
		men: 23.1,
		women: 3.8,
		average: 12.9
	}		,
	{
		country: "Germany",
		lengthCoord: 13.4105301,
		latitudeCoord: 52.5243683,
		year: 2009,
		men: 18.5,
		women: 5.3,
		average: 11.3
	}
];
	
//=============================================================
//======================ZONA INTEGRACIONES=====================
//=============================================================


const URL_02 = "https://sos1920-02.herokuapp.com";
app.use("/api/v2/rural-tourism-stats", function(req, res) {
	console.log("GET API MARTA");
	var url = URL_02 + req.baseUrl + req.url;
	console.log("URL_MARTA: "+url);
	console.log('piped: ' + req.baseUrl + req.url);
	req.pipe(request(url)).pipe(res);
});
app.use(express.static('.'));

const URL_01 = "https://sos1920-01.herokuapp.com";
app.use("/api/v2/poverty-stats", function(req, res) {
	console.log("GET API ANGELA");
	var url = URL_01 + req.baseUrl + req.url;
	console.log("URL_ANGELA: "+url);
	console.log('piped: ' + req.baseUrl + req.url);
	req.pipe(request(url)).pipe(res);
});
app.use(express.static('.'));

const URL_26 = "http://sos1920-26.herokuapp.com";
app.use("/api/v2/goalscorers", function(req, res) {
	console.log("GET API GOLEADORES");
	var url = URL_26 + req.baseUrl + req.url;
	console.log("URL_GOLEADORES: "+url);
	console.log('piped: ' + req.baseUrl + req.url);
	req.pipe(request(url)).pipe(res);
});
app.use(express.static('.'));

const URL_22 = "https://sos1920-22.herokuapp.com";
app.use("/api/v1/og-basket-stats/", function(req, res) {
	console.log("GET API CASTO");
	var url = URL_22 + req.baseUrl + req.url;
	console.log("URL_CASTO:"+url);
	console.log('piped: ' + req.baseUrl + req.url);
	req.pipe(request(url)).pipe(res);
});
app.use(express.static('.'));

//=============================================================
//=============================L08==============================
//=============================================================
	
//L08

//LOAD INITIAL DATA
app.get(BASE_API_URL+"/global-suicides/loadInitialData",(req, res) => {
	
	console.log("New GET .../loadInitialData");
	console.log("Deleting all data...");
	globalSuicidesDb.remove({}, { multi: true }, function (err, numRemoved) {
});
	console.log("Old data deleted...");
	console.log("Creating Initial Data...");
	globalSuicidesDb.insert(globalSuicides);
	res.sendStatus(200,"OK");	
	
	console.log("Initial global-suicides Loaded:"+JSON.stringify(globalSuicides,null,2));
});

	
console.log("Modulo cargado. greetingAPI");
	
//GET GLOBAL SUICIDES	+ BUSQUEDAS
app.get(BASE_API_URL+"/global-suicides",(req, res) => {
	console.log("GET GLOBAL SUICIDES");
	
	var request = {};
	if(req.query.country) request["country"] = req.query.country;
	if(req.query.lengthCoord) request["lengthCoord"] = parseFloat(req.query.lengthCoord);
	if(req.query.latitudeCoord) request["latitudeCoord"] = parseFloat(req.query.latitudeCoord);
	if(req.query.year) request["year"] = parseInt(req.query.year);
	if(req.query.men) request["men"] = parseFloat(req.query.men);
	if(req.query.women) request["women"] = parseFloat(req.query.women);
	if(req.query.average) request["average"] = parseFloat(req.query.average);
	
	var offset = parseInt(req.query.offset) || 0;
	var limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
	
	globalSuicidesDb.find(request,{}).skip(offset).limit(limit).exec((err, suicides) => {
		//la query se pone entre llaves, para que devuelva todo se deja vacío si se pone name: "nono"  sólo devuelve los nono
		suicides.forEach((c) => {
			delete c._id;
		});
		if(suicides.length>=1){
			console.log("Recurso encontrado");
			/*if(suicides.length == 1){
				res.send(JSON.stringify(suicides,null,2));
				console.log("Data sent: "+JSON.stringify(suicides,null,2));
				console.log("Hemos cambiado: res.send(JSON.stringify(suicides[0],null,2));")
			}else{*/																					//02/05/2020
				res.send(JSON.stringify(suicides,null,2));
				console.log("Data sent: "+JSON.stringify(suicides,null,2));
				//}																						//02/05/2020	
		}else{
			console.log("ERROR. No se encuentra el recurso.");
			res.sendStatus(404, "El recurso no existe.");
		}
		
	});
	
});	

app.get(BASE_API_URL+"/global-suicides/:country",(req, res) => {
	console.log("GET COUNTRY_f03");
	
	var country = req.params.country;
	
	globalSuicidesDb.find({country}, (err, suicides) => {
		//la query se pone entre llaves, para que devuelva todo se deja vacío si se pone name: "nono"  sólo devuelve los nono
		suicides.forEach((c) => {
			delete c._id;
		});
		if(suicides.length>=1){
			console.log("El pais existe. Enviado");
			/*if(suicides.length ==1 ){
				res.send(JSON.stringify(suicides[0],null,2));
		console.log("Data sent: "+JSON.stringify(suicides,null,2));
			}else{*/
				res.send(JSON.stringify(suicides,null,2));
		console.log("Data sent: "+JSON.stringify(suicides,null,2));
			//}
		}else{
			console.log("ERROR. No existe ese pais");
			res.sendStatus(404,"ERROR. No existe ese pais.");
		}
		
	});
	
});

app.get(BASE_API_URL+"/global-suicides/:country/:year",(req, res) => {
	console.log("GET YEAR");
	
	var country = req.params.country;
	var year = parseInt(req.params.year);
	
	globalSuicidesDb.find({country, year}, (err, suicides) => {
		//la query se pone entre llaves, para que devuelva todo se deja vacío si se pone name: "nono"  sólo devuelve los nono
		suicides.forEach((c) => {
			delete c._id;
		});
		if(suicides.length >= 1){
			console.log("recurso+year encontrado.");
			res.send(JSON.stringify(suicides[0],null,2));
			console.log("Data sent: "+JSON.stringify(suicides,null,2));
		}else{
			console.log("recurso+year NO EXISTE.");
			res.sendStatus(404,"ERROR. No existe ese pais.");
		}
		
	});
	
});

//DELETE GLOBAL SUICIDES	
app.delete(BASE_API_URL+"/global-suicides",(req, res) => {
	console.log("Delete Global Suicides.");
	
	globalSuicidesDb.remove({}, { multi: true }, function (err, numRemoved) {
});
	res.sendStatus(200,"OK");
});

//POST GLOBAL SUICIDES
app.post(BASE_API_URL+"/global-suicides",(req,res) =>{
	console.log("Post Global Suicides.")
	
	console.log("BODY: "+req);

	var newGlobalSuicides = req.body;

	console.log("Console log: "+newGlobalSuicides);	

	var country = newGlobalSuicides.country;
	var lengthCoord = parseFloat(newGlobalSuicides.lengthCoord);
	var latitudeCoord = parseFloat(newGlobalSuicides.latitudeCoord);
	var year = parseInt(newGlobalSuicides.year);
	var men = parseFloat(newGlobalSuicides.men);
	var women = parseFloat(newGlobalSuicides.women);
	var average = parseFloat(newGlobalSuicides.average);
	
	
	
	//probando el 405
	if((!country) || (!lengthCoord) || (!latitudeCoord) || (!year) || (!men) || (!women) || 
	   (!average) || (Object.keys(newGlobalSuicides).length != 7) || newGlobalSuicides == {}){
		
		if((country == "") || (lengthCoord == 0) || (latitudeCoord == 0) || (year <= 0) || (men < 0) || (women < 0) || (average < 0)){
			
			console.log("ERROR 400. Datos de pais incorrectos.")
	   		res.sendStatus(400,"BAD REQUEST.null.");
			
		}else{
			console.log("ERROR 400. Estructura o comando no permitido.");//******preguntado en piazza di es 400 o 405*****
			console.log("pais: "+ !country+" "+country);
			console.log("lc: "+ !lengthCoord+" "+lengthCoord);
			console.log("latc: "+ !latitudeCoord+" "+latitudeCoord);
			console.log("año: "+ !year+" "+year);
			console.log("hombre: "+ !men+" "+men);
			console.log("mujer: "+ !women+" "+women);
			console.log("media: "+ !average+" "+average);
			console.log("Tamaño: "+ Object.keys(newGlobalSuicides).length);
	   		res.sendStatus(400,"NO PERMITIDO");
		}
		
	}else{
		
		globalSuicidesDb.find({country}, (err, suicides) => {
		console.log("ENTRA en find por pais.post usa");
			
		/*suicides.forEach((c) => {
			console.log(c);
		});
		console.log(suicides);*/
			
		   if(suicides.length >= 1){
			
			console.log("ERROR. El pais ya existe");
			res.sendStatus(409,"El pais ya existe");
			
		}else{
			
			globalSuicidesDb.insert(newGlobalSuicides);
			suicides.forEach((c) => {
			delete c._id;
			});
			console.log("Recurso Creado.");
			res.sendStatus(201,"CREATED");
		}
	   }
	);
	}
});	

//VALIDADO
app.post(BASE_API_URL + "/global-suicides/:country", (req, res) => {
	console.log("POST F03 PROHIBIDO");
    res.sendStatus(405, "NOT ALLOWED(Post/:country)");
});

//VALIDADO
app.put(BASE_API_URL + "/global-suicides", (req, res) => {
	console.log("PUT F03 PROHIBIDO");
    res.sendStatus(405, "NOT ALLOWED(Put)");
});
//DELETE F03 MODIFICAR PATA D01
app.delete(BASE_API_URL+"/global-suicides/:country", (req,res)=>{
	
var country = req.params.country;
	
	globalSuicidesDb.find({country}, (err, suicides) => {

		if(suicides.length>=1){
			console.log("BORRAR EL PAIS: "+country);
			globalSuicidesDb.remove({country}, { multi: true }, function (err, numRemoved) {
			});
			res.sendStatus(200,"OK");
			console.log("Pais Borrado.");
		}else{
			console.log("ERROR. No existe ese pais");
			res.sendStatus(404,"ERROR. No existe ese pais.");
		}
	});	
});
	
	
//PUT globalSuicides  /api/v1/global-suicides/xxx actualiza ese recurso
app.put(BASE_API_URL+"/global-suicides/:country", (req,res)=>{
	
	console.log("PUT Global Suicides.")
	
	var newGlobalSuicides = req.body;
	var country = newGlobalSuicides.country;
	var lengthCoord = parseFloat(newGlobalSuicides.lengthCoord);
	var latitudeCoord = parseFloat(newGlobalSuicides.latitudeCoord);
	var year = parseInt(newGlobalSuicides.year);
	var men = parseFloat(newGlobalSuicides.men);
	var women = parseFloat(newGlobalSuicides.women);
	var average = parseFloat(newGlobalSuicides.average);
	
	console.log(newGlobalSuicides);
	
	globalSuicidesDb.find({country}, (err, suicides) => {
		//la query se pone entre llaves, para que devuelva todo se deja vacío si se pone name: "nono"  sólo devuelve los nono
		suicides.forEach((c) => {
			delete c._id;
		});
		if(suicides.length >= 1){
			console.log("Pais encontrado. Actualizando recurso.");
			if((!country) || (!lengthCoord) || (!latitudeCoord) || (!year) || (!men) || (!women) || 
	   			(!average) || (Object.keys(newGlobalSuicides).length != 7) || newGlobalSuicides == {} || (country == "") || (lengthCoord == 0) || 						(latitudeCoord == 0) || (year <= 0) || (men < 0) || (women < 0) || (average < 0) || isNaN(lengthCoord)
			  || isNaN(latitudeCoord)|| isNaN(year)|| isNaN(men)|| isNaN(women)|| isNaN(average)){
				
				console.log("ISNAN: "+isNaN(average));
			
					console.log("ERROR 400. Datos de pais incorrectos.");
					console.log("ERROR 400. Estructura o comando no permitido.");//******preguntado en piazza di es 400 o 405*****
					console.log("pais: "+ !country+" "+country);
					console.log("lc: "+ !lengthCoord+" "+lengthCoord);
					console.log("latc: "+ !latitudeCoord+" "+latitudeCoord);
					console.log("año: "+ !year+" "+year);
					console.log("hombre: "+ !men+" "+men);
					console.log("mujer: "+ !women+" "+women);
					console.log("media: "+ !average+" "+average);
					console.log("Tamaño: "+ Object.keys(newGlobalSuicides).length);
	   				res.sendStatus(400,"BAD REQUEST.null.");
		
			}else{
				
				globalSuicidesDb.update({country: country}, newGlobalSuicides, (error, numRemoved) => {
				console.log("Recurso actualizado.");
				res.sendStatus(200, "OK");
			})
				
			}
			

		}else{
			console.log("recurso NO EXISTE.");
			res.sendStatus(404,"ERROR. No existe ese pais.");
		}
	});
});


	
}
	