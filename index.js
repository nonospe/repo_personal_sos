const express = require("express");

var app = express();

app.use("/", express.static("./public"));

app.get("/time", (request, response) => {
	response.send("<html>"+new Date()+"</html>");
});

app.listen(80, () => {
	console.log("Server ready.");
});

console.log("Loading Server...");
console.log(new Date());