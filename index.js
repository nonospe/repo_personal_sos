const express = require("express");  //
const bodyParser = require("body-parser"); //
//const marriagesAPI = require("src/back/marriagesAPI");  
const path = require ("path");
const marriagesAPI =require(path.join(__dirname,"./src/back/marriagesAPI"));
const globalSuicidesAPI = require(path.join(__dirname,"./src/back/global-suicides_API"));
const globalDivorcesAPI = require(path.join(__dirname,"./src/back/divorcesAPI"));
const cors = require("cors");

var app = express();//

app.use(cors());

app.use(bodyParser.json());   //

marriagesAPI(app);   

globalSuicidesAPI(app);

globalDivorcesAPI(app);

var port = process.env.PORT || 9999; //

app.use("/", express.static("./public"));

app.listen(port, () => {
    console.log("Server ready on port " + port);
});

console.log("Starting server...");