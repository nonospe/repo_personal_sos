module.exports = function (app) {
    console.log("Registering marriages API....");
    const dataStore = require ("nedb");
    const path = require ("path"); //para que podamos trabajar de manera standar con las direcciones (No haya problema entre Unix y Windows )

    const dbFileName =path.join(__dirname,"./globalMarriages.db");   //archivo donde almacenamos los datos que vamos a persistir
    const BASE_API_URL="/api/v1";   // ESta es la URL base
    
    const db = new dataStore({
        filename: dbFileName,
        autoload:true
    });

    var initial_marriages =  [
        {"country": "Italy","year": 2018,"marriages": 195778,"avg_wm": 32.4,"avg_m": 35.2},
        {"country": "Belgium", "year": 2017,   "marriages": 44329,   "avg_wm": 31.2,   "avg_m": 33.5 },
        {"country": "Mexico",   "year": 2011,   "marriages": 570954,  "avg_wm": 26.3,   "avg_m": 29.2 },
        {"country": "Portugal",   "year": 2016,   "marriages": 32399,   "avg_wm": 30.4,   "avg_m": 32.2 },
        {"country": "Suiza",   "year": 2018,   "marriages": 40716,   "avg_wm": 30.5,   "avg_m": 32.9 }
    ];

    function deleteIDs (marriages){
        marriages.forEach( (m) => {
            delete m._id;
        });
    }




    
    //*****************************METODOS DEL GET***************************************/
    // LOAD INITIAL DATA     
    app.get(BASE_API_URL+"/global-marriages/loadInitialData",(req,res) =>{
        db.remove({}, { multi: true }, function (err, numRemoved) {});
        console.log("New GET... /loadInitialData")
        db.insert(initial_marriages);
        res.send(JSON.stringify(initial_marriages,null,2));
        console.log("Initial marriages loaded:"+JSON.stringify(initial_marriages,null,2));
    })
    


    //GET MARRIAGES
    app.get(BASE_API_URL+"/global-marriages",(req, res) => {
        console.log("GET Global Marriages");       
        //if(req.query.country) request["country"] = req.query.country;
        if(req.query.year) req.query.year = parseInt(req.query.year);
        if(req.query.marriages) req.query.marriages = parseInt(req.query.marriages);
        if(req.query.avg_m) req.query.avg_m = parseFloat(req.query.avg_m);
        if(req.query.avg_wm) req.query.avg_wm = parseFloat(req.query.avg_wm);
        
        var parametros = req.query;
        console.log(parametros);
        
        //Paginacion
        let offset = null;
        let limit =null;
  
        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }  
        
        db.find(parametros).skip(offset).limit(limit).exec((err, marriages)=> {
        deleteIDs(marriages);

        if (marriages.length>=1) {
            res.send(JSON.stringify(marriages,null,2));
            console.log("Data sent: "+JSON.stringify(marriages,null,2));
        }else {
            res.sendStatus(404,"Not found")
        }
        
        });
    });


 
    //GET GLOBAL-MARRIAGES/XXX

	app.get(BASE_API_URL+"/global-marriages/:country/:year", (req,res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
       
        db.find({$and: [{"country": country},{"year": year}]  },(err,marriages)=>{
            console.log(marriages);
            if (marriages.length != 0) {
                deleteIDs(marriages);
                res.send(JSON.stringify(marriages[0],null,2));
                console.log("Data sent: " + JSON.stringify(marriages[0],null,2));
            } else{
                res.sendStatus(404, "COUNTRY NOT FOUND");
            }
        })
	});








// GET GLOBAL-MARRIAGES/XXX
/*
app.get(BASE_API_URL+"/global-marriages/:param", (req, res) => {
    var param = req.params.param;
    var query = {};
    // Checking if we can parse the param, if so, it's a country
    // And the query is just to specify the country
    if (isNaN(parseInt(param))) {
        query = {country: param};
    } else {
        query = {year: parseInt(param)};
        
    }
    
    db.find(query).exec((error, marriages) => {

        if (marriages.length > 1) {
            deleteIDs(marriages);
            res.send(JSON.stringify(marriages, null, 2)); 
            console.log("Data sent: " + JSON.stringify(marriages, null, 2));
            
        }
        // We consider the posibility of returning just 1 element and return a JSON and not an array
        
        else if (marriages.length == 1) {
            delete marriages[0]._id;
            res.send(JSON.stringify(marriages[0], null, 2)); 
            console.log("Data sent: " + JSON.stringify(marriages[0], null, 2));
            
        } 
        
        else {
            res.sendStatus(404, "NOT FOUND");
        }
    });

    console.log("OK.");

});
*/


      //*****************************METODOS DEL POST***************************************/

    // POST GLOBAL-MARRIAGES

	app.post(BASE_API_URL+"/global-marriages", (req, res) => {
        var marriage = req.body;

		if((marriage == {}) 
			 || (marriage.country == null) 
             || (marriage.year == null) 
			 || (marriage.marriages == null) 
			 || (marriage.avg_m == null) 
             || (marriage.avg_wm == null)){	
			res.sendStatus(400,"BAD REQUEST");
		} else {
			db.insert(marriage);
			
			res.sendStatus(201, "CREATED");
		}
	});


    //POST incorrecto
app.post(BASE_API_URL + "/global-marriages/:country", (req, res) => {
    res.sendStatus(405);
});
//POST incorrecto
app.post(BASE_API_URL + "/global-marriages/:country/:year", (req, res) => {
    res.sendStatus(405);
});



      //*****************************METODOS DEL PUT***************************************/

//PUT GLOBAL-MARRIAGE/XXX

	app.put(BASE_API_URL+"/global-marriages/:country/:year", (req,res) =>{
        var country = req.params.country;
        var year = parseInt(req.params.year);

		var body = req.body;

		db.update({country: country, year: year}, body, (error, numRemoved) => {
			// Checking if any data has been updated (numRemoved>=1)
			if (numRemoved == 0) {
				res.sendStatus(404, "NOT FOUND");
			} else {
				res.sendStatus(200, "OK");
			}
		});

	});


    //PUT incorrecto
    app.put(BASE_API_URL + "/global-marriages/", (req, res) => {
        res.sendStatus(405);
    });


      //*****************************METODOS DEL DELETE***************************************/

    //DELETE GLOBAL-MARRIAGES

	app.delete(BASE_API_URL + "/global-marriages", (req,res)=>{
		db.remove({}, { multi: true }, function (err, numRemoved) {
            if (numRemoved>=1) {
                res.sendStatus(200, "OK");
            }else{
                res.sendStatus(404, "NOT FOUND");
            }
          
        });
    });
    

    //DELETE GLOBAL-MARRIAGES/XXX

	app.delete(BASE_API_URL+"/global-marriages/:country/:year",(req,res) =>{

		var country = req.params.country;
		var year =  parseInt(req.params.year);
		
		var query = {country: country, year:year};
		
		db.remove(query, { multi: true }, (error, numRemoved) => {
			if (numRemoved == 0) {
				res.sendStatus(404, "NOT FOUND");
			} else {
				res.sendStatus(200, "OK");
			}
		}); 
	});

/*
    app.delete(BASE_API_URL+"/global-marriages/:param",(req,res) =>{

		var param = req.params.param;
		
		var query = {};
		
		// Checking if we can parse the param, if so, it's a country
		// And the query is just to specify the country
		if (isNaN(parseInt(param))) {
			query = { country: param };
			
		} else {
			query = { year: parseInt(param) };
			
		}
		
		db.remove(query, { multi: true }, (error, numRemoved) => {
			if (numRemoved == 0) {
				res.sendStatus(404, "NOT FOUND");
			} else {
				res.sendStatus(200, "OK");
			}
		}); 
		
	});
*/












    console.log("... OK")
    

};




