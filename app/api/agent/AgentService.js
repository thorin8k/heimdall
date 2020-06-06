import { BaseService } from '../base';
import { Agent } from './';

export class AgentService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('agent', Agent);
    }

    getAgentBySecret(secret) {
        return this.mainDao.loadFilteredData({ secret: secret }, 0, 1);
    }



    async listenForAgents() {
        global.io.on('connection', (socket) => {
            console.log('Agent connected: ' + socket.client.id);
            //Obtener el secret del agente
            let secret = socket.handshake.query.secret;
            //Obtener el agente relacionado con el secret
            let agent = await this.getAgentBySecret(secret);
            if (!agent) { //Si no se obtiene ninguno, desconectar el cliente
                socket.emit('messages', 'Secret not valid');
                return socket.disconnect();
            }

            //Si se obtiene, se notifica al cliente que esta conectado y se almacenan sus datos
            //para desencadenar luego trabajos.
            agent.meta.socketId = socket.client.id;
            //TODO store meta data
            await this.mainDao.save(agent);
            socket.emit('messages', "Hola!");
        });
    }

}

