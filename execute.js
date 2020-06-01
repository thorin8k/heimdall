require = require("esm")(module/*, options*/)
//module dependencies.
require('./loadapp.js')(true);


//Capturar errores perdidos
process.on('uncaughtException', (err) => {
    // handle the error safely
    console.error("Error: %s", err.stack || err.message);
});
