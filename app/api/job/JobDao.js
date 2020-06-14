import { BaseDao } from '../base';

/**
 * Los agentes son procesos que se conectan al servidor mediante un websocket
 * 
 * Su cometido es ejecutar Jobs y generar Executions.
 * 
 * La propiedad 'meta' almacena información relativa al sistema operativo, etc.
 */
export class JobDao extends BaseDao {

    constructor(tableName, model) {
        super(tableName, model);
    }

    loadAllData() {

        const aggregation = [
            {
                "$lookup": {
                    from: "agent",
                    localField: "agents",
                    foreignField: "id",
                    as: "agents_info"
                }
            },
            {
                "$lookup": {
                    from: "command",
                    localField: "commands",
                    foreignField: "id",
                    as: "commands_info"
                }
            }
        ]

        return global.con.collection(this.tableName).aggregate(aggregation).map((e) => this.model && this.model.fromObject ? this.model.fromObject(e) : e).toArray();
    }
    loadFilteredData(filters, start, limit) {


        const aggregation = [
            { '$match': { ...filters } },
            {
                "$lookup": {
                    from: "agent",
                    localField: "agents",
                    foreignField: "id",
                    as: "agents_info"
                }
            },
            {
                "$lookup": {
                    from: "command",
                    localField: "commands",
                    foreignField: "id",
                    as: "commands_info"
                }
            }
        ]

        return global.con.collection(this.tableName).aggregate(aggregation).skip(start).limit(limit).map((e) => this.model && this.model.fromObject ? this.model.fromObject(e) : e).toArray();
    }
    loadById(objectId) {

        const aggregation = [
            { '$match': { id: objectId } },
            {
                "$lookup": {
                    from: "agent",
                    localField: "agents",
                    foreignField: "id",
                    as: "agents_info"
                }
            },
            {
                "$lookup": {
                    from: "command",
                    localField: "commands",
                    foreignField: "id",
                    as: "commands_info"
                }
            }
        ]


        return global.con.collection(this.tableName).aggregate(aggregation).map((e) => this.model && this.model.fromObject ? this.model.fromObject(e) : e).toArray();
    }

}