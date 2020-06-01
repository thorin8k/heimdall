import Utils from './app/common/Utils.js';
import Settings from './app/common/Settings.js';
import ClusterServer from './app/ClusterServer.js';
import Server from './app/Server.js';
import Logger from './app/common/Logger.js';



module.exports = (withLog) => {

    //Carga de utilidades
    global.utils = Utils;
    //Carga de configuraciones
    global.settings = Settings.load();

    new Logger();

    const url = global.settings.getConfigValue('mongoDbUrl');
    const MongoClient = require('mongodb').MongoClient;


    (async () => {
        // Database Name
        const dbName = 'heimdall';
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            // Use connect method to connect to the Server
            await client.connect();

            global.con = client.db(dbName);
        } catch (err) {
            console.log(err.stack);
        }


        console.log("starting");

        //Inicio del cluster server
        const clServ = new ClusterServer(Server, global.settings.getConfigValue("server:port"), global.settings.getConfigValue("server:clustered"));
        clServ.start(withLog);
    })();

}