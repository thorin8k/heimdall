import { BaseService } from '../base';
import { Agent } from './';
import { AgentDao } from './AgentDao';

export class AgentService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('agent', Agent);
        this.mainDao = new AgentDao('agent', Agent);
    }

    async getAgentBySecret(secret) {
        const list = await this.mainDao.loadFilteredData({ secret: secret }, 0, 1);
        return list ? list[0] : null;
    }

    releaseAllAgents() {
        return this.mainDao.releaseAgents();
    }

    async listenForAgents() {
        global.sockets = {};
        await this.releaseAllAgents();
        global.io.on('connection', async (socket) => {
            //Obtener el secret del agente
            let secret = socket.handshake.query.secret;
            //Obtener el agente relacionado con el secret
            let agent = await this.getAgentBySecret(secret);
            if (!agent) { //Si no se obtiene ninguno, desconectar el cliente
                socket.emit('messages', 'Secret not valid');
                return socket.disconnect();
            }
            if (agent && agent.socketId != null) {
                socket.emit('messages', 'Agent already online');
                return socket.disconnect();
            }
            console.log('Agent connected: ' + socket.client.id);

            //Si se obtiene, se notifica al cliente que esta conectado y se almacenan sus datos
            //para desencadenar luego trabajos.
            if (!agent.meta) {
                agent.meta = {};
            }
            agent.socketId = socket.client.id;
            agent.status = Agent.STATUS_ONLINE;

            //Register agent
            global.sockets[agent.id] = {
                socket: socket,
                agent: agent
            };

            //TODO store meta data
            agent.meta = {
                ip: socket.conn.remoteAddress,
                platform: socket.handshake.query.platform
            }
            await this.mainDao.update(agent.id, agent);
            socket.emit('messages', "Connected!");


            socket.on('disconnect', async () => {
                console.log('Got disconnect!');
                agent.status = Agent.STATUS_OFFLINE;
                agent.socketId = null;

                delete global.sockets[agent.id];

                await this.mainDao.update(agent.id, agent);
            });
        });
    }

}

