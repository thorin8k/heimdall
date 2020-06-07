import { BaseDao } from '../base';

/**
 * Los agentes son procesos que se conectan al servidor mediante un websocket
 * 
 * Su cometido es ejecutar Jobs y generar Executions.
 * 
 * La propiedad 'meta' almacena información relativa al sistema operativo, etc.
 */
export class AgentDao extends BaseDao {

    constructor(tableName, model) {
        super(tableName, model);
    }


    releaseAgents() {
        return global.con.collection(this.tableName)
            .updateMany({}, { $set: { socketId: null, status: 'offline' } });
    }
}