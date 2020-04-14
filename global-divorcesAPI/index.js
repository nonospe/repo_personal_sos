module.exports = function(app){
	console.log("Registering global-divorces API...");
	const path = require("path");
	const dataStore = require("nedb");
	const dbFileName = path.join(__dirname, "global-divorces.db");
	const BASE_API_URL = "/api/v1";


	const db = new dataStore({
				filename: dbFileName ,
				autoload: true}
				
);
	
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

/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// GET DIVORCES ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////	

app.get(BASE_API_URL+"/global-divorces", (req,res) =>{
	console.log("New GET .../global-divorces");
	
	var parametros = {};
	if(req.query.country) parametros["country"]= req.query.country;
	if(req.query.year) parametros["year"] = parseInt(req.query.year);
	if(req.query.divorce) parametros["divorce"] = parseInt(req.query.divorce);
	if(req.query.crude_rate) parametros["crude_rate"] = parseFloat(req.query.crude_rate);
	if(req.query.variation) parametros["variation"] = parseFloat(req.query.variation);
	
	

//	console.log(parametros);
	
	var offset = parseInt(req.query.offset) || 0;
	var limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
	
	db.find(parametros,{}).skip(offset).limit(limit).exec((err, divorces) => {	
		
		divorces.forEach((d)=>{delete d._id;});
		if(divorces.length>=1){
			
			if(divorces.length == 1){
				res.send(JSON.stringify(divorces[0],null,2));
			}
			else{
				res.send(JSON.stringify(divorces,null,2));

		}

			console.log("Data sent:"+JSON.stringify(divorces,null,2));}
		else{
			console.log("ERROR DATA NOT FOUND");
			res.sendStatus(404, "DATA NOT FOUND");
		}
		
	});
	
});


	
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////GET globalDivorces  loadInitialData///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
	
	
app.get(BASE_API_URL+"/global-divorces/loadInitialData",(req, res) => {
	var initialData = [
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
	},
	{
		country:"Albania",
		year: 2018,
		divorce: 4846,
		crude_rate: 1.7,
		variation: 0.1
	},
	{
		country:"Cyprus",
		year: 2017,
		divorce: 1932,
		crude_rate: 2.2,
		variation: -0.1
	}
];

	console.log("New GET .../loadInitialData");
	db.insert(initialData);
	
	
	initialData.forEach((d)=>{delete d._id;});
		
	
	res.sendStatus(200,"LOADED");
	console.log("Initial divorces loaded: "+JSON.stringify(initialData, null,2))
});
	
	

///////////////////////////////////////////////////////////////////////////////////////	
/////////////////////////////////// POST DIVORCES /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////	
	
	

app.post(BASE_API_URL+"/global-divorces",(req,res) =>{
	console.log("New POST .../global-divorces");

	var newDivorce = req.body;
	
	var pais = newDivorce.country;
	var anio = newDivorce.year;	
	var divorcios = newDivorce.divorce;
	var crudeRate = newDivorce.crude_rate;
	var variacion = newDivorce.variation;


	
	
	if(newDivorce == "" || newDivorce.country == null || typeof pais != "string" || isNaN(anio) || isNaN(divorcios) || isNaN(crudeRate) || isNaN(variacion)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		db.insert(newDivorce);
		console.log("Data created:"+JSON.stringify(newDivorce,null,2));

		res.sendStatus(201,"CREATED");
	}
});
	
	
/////////////////////////////////////////////////////////////////////////////
////////////////////////////// DELETE DIVORCES //////////////////////////////
/////////////////////////////////////////////////////////////////////////////
	
app.delete(BASE_API_URL+"/global-divorces", (req,res)=>{
	db.remove({}, { multi: true }, function (err, numRemoved) {
});

	res.sendStatus(200, "DELETED")
} );

	
////////////////////////////////////////////////////////////////////////
//////////////////////////// PUT Divorce ///////////////////////////////
////////////////////////////////////////////////////////////////////////
	
app.put(BASE_API_URL+"/global-divorces/:country/:year", (req,res)=>{
	var parametros = {"country": req.params.country,
					 "year": parseInt(req.params.year)};	
	var updatedDivorce = req.body;
	
	var pais = updatedDivorce.country;
	var anio = updatedDivorce.year;	
	var divorcios = updatedDivorce.divorce;
	var crudeRate = updatedDivorce.crude_rate;
	var variacion = updatedDivorce.variation;

	
    if(updatedDivorce == "" || typeof pais != "string" || isNaN(anio) || isNaN(divorcios) || isNaN(crudeRate) || isNaN(variacion)){
		res.sendStatus(400,"BAD REQUEST");} 
	else{
		db.update(parametros, updatedDivorce, {}, function (err, numReplaced) {
			if (numReplaced == 0) {
				res.sendStatus(404, "NOT FOUND");
 		 	}else {
				console.log("Data updated:"+JSON.stringify(updatedDivorce,null,2));
			 	res.sendStatus(200, "OK");
					}
});}
    
	
});
	
	
//////////////////////////////////////////////////////////
/////////////////// DELETE Divorce/XXX////////////////////
//////////////////////////////////////////////////////////
	
app.delete(BASE_API_URL+"/global-divorces/:country/:year", (req,res)=>{
	var parametros = {"country": req.params.country,
					 "year": parseInt(req.params.year)};
	console.log(parametros);
	
	db.remove(parametros, { multi: true }, function (err, numRemoved) {
  if(numRemoved ==0){
	res.sendStatus(404,"COUNTRY NOT FOUND");
		
	}else{
		res.sendStatus(200);
	}
});
	

});
	
/////////////////////////////////////////	
////////////////POST ERROR///////////////
/////////////////////////////////////////	
//6-f
app.post(BASE_API_URL + "/global-divorces/:country", (req, res) => {
	
    res.sendStatus(405, "NOT ALLOWED(Post/:country)");
});

//6-g
app.put(BASE_API_URL + "/global-divorces", (req, res) => {
	
    res.sendStatus(405, "NOT ALLOWED(Put/global-divorces)");
});
	console.log("OK");

	

}