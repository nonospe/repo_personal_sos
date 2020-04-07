function init(app,globalSuicidesDb){
	
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
/*	
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
	res.sendStatus(200,"OK");
});


//6-b
//POST globalSuicides crea un nuevo recurso FUNCIONA
app.post(BASE_API_URL+"/global-suicides",(req,res) =>{
	
	var newGlobalSuicides = req.body;
	
	if((newGlobalSuicides == "") || (newGlobalSuicides == null)){
		res.sendStatus(400,"BAD REQUEST(Resource empty or null)");
	} else {
		globalSuicides.push(newGlobalSuicides); 	
		res.sendStatus(201,"CREATED");
	}
});


//6-c
//GET globalSuicides  /api/v1/global-suicides/xxx devuelve ese recurso FUNCIONA
app.get(BASE_API_URL+"/global-suicides/:country", (req,res)=>{
	//console.log("ENTRA.");
	var country = req.params.country;
	
	var countryFilter = globalSuicides.filter((c) => {
		return (c.country == country);
	});
	
	if(countryFilter.length >= 1){
		res.send(countryFilter[0]);
		res.sendStatus(200,"OK");
		//console.log("LO HA ENCONTRADO");
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
		//console.log("NO HAY");
	}
});

//6-d
//DELETE globalSuicides  /api/v1/global-suicides/xxx borra ese recurso //FUNCIONA
app.delete(BASE_API_URL+"/global-suicides/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var countryFilter = globalSuicides.filter((c) => {
		return (c.country != country);
	});
	
	if(countryFilter.length < globalSuicides.length){
		globalSuicides = countryFilter;
		res.sendStatus(200, "OK(Country deleted)");
	}else{
		res.sendStatus(404,"NOT FOUND(Country)");
	}	
});

//6-e
//PUT globalSuicides  /api/v1/global-suicides/xxx actualiza ese recurso
app.put(BASE_API_URL+"/global-suicides/:country", (req,res)=>{
	var country = req.params.country;
	
	var updatedSuicide = req.body;
	
	
	if(country!=updatedSuicide.country){
        res.sendStatus(400);
    }else{
        var countryFilter = divorces.filter((c) => {
        return (c.country != country || c.year != year);
        });
		if(countryFilter.length == 0){
		res.sendStatus(404,"DATA NOT FOUND");
		return;
	}
		else{ globalSuicides = globalSuicides.map((c) =>{
			if(c.country == updatedSuicide.country){
			return updatedSuicide;
		}else{
			return c;
		}
		});}
    }	
	res.sendStatus(200);
});


//6-f
//POST globalSuicides  /api/v1/global-suicides/xxx debe dar un error de método no permitido. //FUNCIONA
app.post(BASE_API_URL + "/global-suicides/:country", (req, res) => {
	
    res.sendStatus(405, "NOT ALLOWED(Post/:country)");
});


//6-g
//PUT globalSuicides  /api/v1/global-suicides debe dar un error de método no permitido. //FUNCIONA
app.put(BASE_API_URL + "/global-suicides", (req, res) => {
	
    res.sendStatus(405, "NOT ALLOWED(Put)");
});

//6-h
//DELETE globalSuicides  /api/v1/global-suicides borra todos los recursos //FUNCIONA
app.delete(BASE_API_URL + "/global-suicides", (req,res)=>{
	
	globalSuicides = [];
	
	res.sendStatus(200,"OK(Deleted)");
});
*/	
//=============================================================
//=============================L08==============================
//=============================================================
	
//L08
app.get(BASE_API_URL+"/global-suicides/loadInitialData",(req, res) => {
	
	console.log("New GET .../loadInitialData");
	
	globalSuicidesDb.insert(globalSuicides);
	res.sendStatus(200,"OK");	
	
	console.log("Initial global-suicides Loaded:"+JSON.stringify(globalSuicides,null,2));
});

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
	
});
	
	console.log("Modulo cargado. greetingAPI");
	
	
	
}

module.exports = init;