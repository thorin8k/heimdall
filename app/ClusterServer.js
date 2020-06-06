import http from 'http';
import socketIO from 'socket.io';
import { AgentService } from './api/agent';
/**
 * Inicializa la escucha del server en modo cluster
 */
export class ClusterServer {
    constructor(cls, port, clustered) {

        this.port = this.normalizePort(port || 3000);
        this.cls = cls;
        this.clustered = clustered;

        this.executeOnlyMain = () => { };
    }
    /**
     * 
     */
    start(withLog) {
        this.withLog = withLog;
        if (this.clustered === true) {
            this.initClustered(this.cls);
        } else {

            this.executeOnlyMain();
            this.initUnclustered(this.cls);
        }
    }

    /**
     * Inicializa la clase server encargada del control de las solicitudes en forma multiproceso.
     *
     */
    initClustered(cls) {
        const cluster = require("cluster");
        //Launch cluster
        if (cluster.isMaster) {
            this.executeOnlyMain();
            //Count the machine's CPUs
            const cpuCount = require('os').cpus().length;

            //Create a worker for each CPU
            for (let idx = 0; idx < cpuCount; idx += 1) {
                let worker = cluster.fork();
                //Captura de los mensajes enviados por los workers ( cluster.worker.send({ }); )
                worker.on('message', (message) => {
                    this.onWorkerMessage(message, worker.id); //TODO
                });
            }

            //Listen for dying workers
            cluster.on('exit', (worker) => {

                //Replace the dead worker, we're not sentimental
                console.log('Worker ' + worker.id + ' died :(');
                cluster.fork();

            });
        } else {
            this.initUnclustered(cls);

        }
    }
    /**
     * Inicializa la clase server encargada del control de las solicitudes en un unico proceso.
     *
     */
    initUnclustered(cls) {
        //Initialize clustered servers

        this.server = new cls();
        this.server.withLog = this.withLog;

        this.server.port = this.port;
        //create http server
        let server = http.Server(this.server.app);

        global.io = socketIO(server);

        this.server.initialize();

        //listen on provided ports
        server.listen(this.server.port);

        //add error handler
        server.on("error", (err) => {
            this.handleErrors(err, this.server.port);
        });
        //start listening on port
        server.on("listening", () => {
            this.trazeStart();
        });

        //TODO: create https server from config
    }

    /**
     * Controla los posibles errores de formato en el puerto
     * @param val
     * @returns {*}
     */
    normalizePort(val) {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            //named pipe
            return val;
        }

        if (port >= 0) {
            //port number
            return port;
        }

        return false;
    }
    /**
     * Gestiona los errores en el listen del servidor
     */
    handleErrors(error, port) {
        if (error.syscall !== "listen") {
            throw error;
        }

        let bind = typeof port === "string"
            ? "Pipe " + port
            : "Port " + port;

        //handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    /**
     * Muestra el mensaje cuando el servidor inicia
     */
    trazeStart() {
        console.log('Server Worker running on port: ' + this.port + '!');
    }
}
