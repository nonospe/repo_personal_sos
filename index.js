const express = require("express");
const bodyParser = require("body-parser");
const dataStore = require("nedb");
const path = require("path");
const globalSuicidesAPI = require(path.join(__dirname,"global-suicides_API"));
const marriagesAPI = require(path.join(__dirname,"marriagesAPI"));


var port = process.env.PORT || 80;
const dbGSuicides = path.join(__dirname,"global-suicides_API/suicides.db");

const app = express();
app.use(bodyParser.json());


app.use("/", express.static("./public"));





const BASE_API_URL = "/api/v1"; //Esta línea debemos copiarla en cada carpeta
/*====================================================*/
/*========= Antonio Jose Jimenez Segovia =========*/
/*====================================================*/

const globalSuicidesDb = new dataStore({							//objeto
	filename: dbGSuicides,
	autoload: true
});


globalSuicidesAPI(app, globalSuicidesDb);

/*====================================================*/
/*========= API_Jesús Vázquez Rivadeneyra =========*/
/*====================================================*/

marriagesAPI(app)

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
console.log("Connected on port: " + port);