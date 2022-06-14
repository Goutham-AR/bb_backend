// 3rd party
const express = require("express");
const bodyParser = require("body-parser");

// custom
const api = require("./api");
const middlewares = require("./middlewares");

const port = process.env.PORT || 1337;

const app = express();
app.use(middlewares.cors);
app.use(bodyParser.json());
app.get("/donors", api.listDonors);
app.get("/donors/:id", api.getDonor);
app.post("/donors", api.createDonor);
app.put("/donors/:id", api.editDonor);
app.delete("/donors/:id", api.deleteDonor);
app.use(middlewares.handleError);
app.use(middlewares.notFound); 
app.listen(port, () => console.log(`Server listening on port: ${port}`));
