import { BaseService } from '../base';
import { Agent } from './';

export class AgentService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('agent', Agent);
    }


    listenForAgents() {
        global.io.on('connection', (socket) => {
            console.log('Agent connected: ' + socket.client.id);
            console.log('Secret: ' + socket.handshake.query.secret);
            if (socket.handshake.query.secret !== 'blabla') {
                socket.emit('messages', 'Secret not valid');
                return socket.disconnect();
            }
            socket.emit('messages', "Hola!");
        });
    }

}

