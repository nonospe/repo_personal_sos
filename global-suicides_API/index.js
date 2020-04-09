module.exports = function init(app,globalSuicidesDb){
	
	const BASE_API_URL = "/api/v1";
	
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
	
//=============================================================
//======================ZONA TEST==============================
//=============================================================

	
	

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
/*
//GET GLOBAL SUICIDES
app.get(BASE_API_URL+"/global-suicides",(req, res) => {
	console.log("New GET_0.1 global-suicides");
	
	globalSuicidesDb.find({}, (err, suicides) => {
		//la query se pone entre llaves, para que devuelva todo se deja vacío si se pone name: "nono"  sólo devuelve los nono
		suicides.forEach((c) => {
			delete c._id;
		});
		
		console.log("New GET_0.2  suicides");
		
		res.send(JSON.stringify(suicides,null,2));
		
		console.log("Data sent: "+JSON.stringify(suicides,null,2));
	});
	
});*/
	
console.log("Modulo cargado. greetingAPI");
	
	
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
	
	const offset =  0;
	const limit = Number.MAX_SAFE_INTEGER;
	
	globalSuicidesDb.find(request,{}).skip(offset).limit(limit).exec((err, suicides) => {
		//la query se pone entre llaves, para que devuelva todo se deja vacío si se pone name: "nono"  sólo devuelve los nono
		suicides.forEach((c) => {
			delete c._id;
		});
		
		console.log("New GET_0.2  suicides");
		
		res.send(JSON.stringify(suicides,null,2));
		
		console.log("Data sent: "+JSON.stringify(suicides,null,2));
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
		
		res.send(JSON.stringify(suicides,null,2));
		console.log("Data sent: "+JSON.stringify(suicides,null,2));
			
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
		
		console.log("New GET_0.2  suicides");
		
		res.send(JSON.stringify(suicides,null,2));
		
		console.log("Data sent: "+JSON.stringify(suicides,null,2));
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
	
	var newGlobalSuicides = req.body;
	var country = newGlobalSuicides.country;
	
	console.log(newGlobalSuicides);
	
	if((newGlobalSuicides.country == "") || (newGlobalSuicides == null)){
		Console.log("ERROR. Pais en blanco o valor nulo.")
	   res.sendStatus(400,"BAD REQUEST(Resource empty or null)");
	   }
	
	globalSuicidesDb.find({country}, (err, suicides) => {
		console.log("ENTRA");
		/*suicides.forEach((c) => {
			console.log(c);
		});
		console.log(suicides);*/
		if(suicides.length >= 1){
			
			console.log("ERROR. El pais ya existe");
			res.sendStatus(409,"El pais ya existe");
			
		}else{
			
			globalSuicidesDb.insert(newGlobalSuicides);
			console.log("Recurso Creado.");
			res.sendStatus(201,"CREATED");
		}
	});
});	

app.post(BASE_API_URL + "/global-suicides/:country", (req, res) => {
	console.log("POST F03 PROHIBIDO");
	
    res.sendStatus(405, "NOT ALLOWED(Post/:country)");
});
	
app.put(BASE_API_URL + "/global-suicides", (req, res) => {
	console.log("PUT F03 PROHIBIDO");
	
    res.sendStatus(405, "NOT ALLOWED(Put)");
});
	
	
}
	