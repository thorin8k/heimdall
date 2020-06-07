import { BaseModel } from '../base';

/**
 * Los agentes son procesos que se conectan al servidor mediante un websocket
 * 
 * Su cometido es ejecutar Jobs y generar Executions.
 * 
 * La propiedad 'meta' almacena información relativa al sistema operativo, etc.
 */
export class Agent extends BaseModel {

    static get STATUS_ONLINE() { return 'online' };
    static get STATUS_OFFLINE() { return 'offline' };

    constructor(id, name, status, is_busy, secret, meta) {
        super(id);
        this.name = name;
        this.status = status;
        this.is_busy = is_busy;
        this.secret = secret;
        this.meta = meta;
    }

    
    
}