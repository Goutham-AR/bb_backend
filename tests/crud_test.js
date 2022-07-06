const axios = require("axios");
const { exec } = require("child_process");


const startupScript = "./scripts/startup.sh";
const serverPath = "./server.js";
const serverPort = process.env.PORT || 1337;
const serverURL = `127.0.0.1:${serverPort}`;




function runTests() {
// routes testing
// app.post("/login", auth.authenticate, auth.login);
    // axios.post(serverURL, )
// app.get("/donors", api.listDonors);
    axios.get(`${serverURL}/donors`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
// app.get("/donors/:id", api.getDonor);
// app.post("/donors", auth.ensureAdmin, api.createDonor);
// app.put("/donors/:id", auth.ensureAdmin, api.editDonor);
// app.delete("/donors/:id", auth.ensureAdmin, api.deleteDonor);
}

runTests();


// function startServer() {
//     exec(`node ${serverPath}`, (error, stdout, stderr) => {
//         if (error) console.error(`error in executing ${serverPath}:\n${error}`);
//         if (stderr) console.error(`${stderr}`);
    
//         console.log(`${stdout}`);
        
//         runTests();
//     });
// }


// exec(startupScript, (error, stdout, stderr) => {
//     if (error) console.error(`error in executing ${startupScript}:\n${error}`);
//     if (stderr) console.error(`${stderr}`);

//     console.log(`${stdout}`);

//     startServer();


// });





