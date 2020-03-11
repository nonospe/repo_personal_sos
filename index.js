const express = require("express");

var app = express();

var port = process.env.PORT || 80;

app.use("/", express.static("./public"));




app.get("/time", (request, response) => {
	response.send("<html>"+new Date()+"</html>");
});

app.listen(port, () => {
	console.log("Server ready.");
});

console.log("Loading Server...");
console.log(new Date());