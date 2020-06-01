import { Logger, Settings, Utils } from './app/common';
import { Server, ClusterServer } from './app/';
import mongodb from 'mongodb';

module.exports = (withLog) => {

    //Carga de utilidades
    global.utils = Utils;
    //Carga de configuraciones
    global.settings = Settings.load();

    new Logger();

    const url = global.settings.getConfigValue('mongoDbUrl');
    const MongoClient = mongodb.MongoClient;


    return (async () => {
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



        //Inicio del cluster server
        global.cluster_server = new ClusterServer(Server, global.settings.getConfigValue("server:port"), global.settings.getConfigValue("server:clustered"));
        global.cluster_server.start(withLog);
    })();

}