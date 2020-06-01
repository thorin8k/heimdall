require = require("esm")(module/*, options*/)
//module dependencies.
require('./loadapp.js')(true).then(() => {

    console.log("Started");

});

//Capturar errores perdidos
process.on('uncaughtException', (err) => {
    // handle the error safely
    console.error("Error: %s", err.stack || err.message);
});
