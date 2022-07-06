// 3rd party
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");

// custom
const api = require("./api");
const middlewares = require("./middlewares");
const auth = require("./auth");

const port = process.env.PORT || 1337;


const app = express();

// middlewares
app.use(middlewares.cors);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

// routes
app.post("/login", auth.authenticate, auth.login);
app.get("/donors", api.listDonors);
app.get("/donors/:id", api.getDonor);
app.post("/donors", auth.ensureAdmin, api.createDonor);
app.put("/donors/:id", auth.ensureAdmin, api.editDonor);
app.delete("/donors/:id", auth.ensureAdmin, api.deleteDonor);

app.use(middlewares.handleError);
app.use(middlewares.notFound); 

app.listen(port, () => console.log(`Server listening on port: ${port}`));


