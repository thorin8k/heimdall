import { BaseDao } from '../base';

/**
 * Los agentes son procesos que se conectan al servidor mediante un websocket
 * 
 * Su cometido es ejecutar Jobs y generar Executions.
 * 
 * La propiedad 'meta' almacena información relativa al sistema operativo, etc.
 */
export class ProjectDao extends BaseDao {

    constructor(tableName, model) {
        super(tableName, model);
    }

    loadAllData() {
        const aggregation = {
            '$lookup': {
                from: 'job',
                localField: 'id',
                foreignField: 'project',
                as: 'jobs'
            }
        };

        return global.con.collection(this.tableName).aggregate([aggregation]).map((e) => this.model && this.model.fromObject ? this.model.fromObject(e) : e).toArray();
    }
    loadFilteredData(filters, start, limit) {

        const aggregation = {
            '$lookup': {
                from: 'job',
                localField: 'id',
                foreignField: 'project',
                as: 'jobs'
            }
        };

        return global.con.collection(this.tableName).aggregate([{ '$match': { ...filters } }, aggregation]).skip(start).limit(limit).map((e) => this.model && this.model.fromObject ? this.model.fromObject(e) : e).toArray();
    }
}