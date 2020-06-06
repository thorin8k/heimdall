import uuid from 'uuid';


/**
 * Crear un dao con esta estructura pero contra MongoDB
 * 
 */
export class BaseDao {

    constructor(tableName, model) {
        this.tableName = tableName;
        this.model = model;
    }

    loadAllData() {
        return global.con.collection(this.tableName).find().map((e) => this.model && this.model.fromObject ? this.model.fromObject(e) : e).toArray();
    }
    loadFilteredData(filters, start, limit) {
        return global.con.collection(this.tableName).find({ ...filters }).skip(start).limit(limit).map((e) => this.model && this.model.fromObject ? this.model.fromObject(e) : e).toArray();
    }
    loadById(objectId) {
        return global.con.collection(this.tableName).find({ id: objectId }).map((e) => this.model && this.model.fromObject ? this.model.fromObject(e) : e).toArray();
    }
    save(object) {
        if (!object.id) {
            object.id = uuid.v4();
        }
        return global.con.collection(this.tableName).insertOne({ ...object });
    }
    update(objectId, newObject) {
        return global.con.collection(this.tableName)
            .findOneAndUpdate({ id: objectId }, { $set: { ...newObject } });
    }
    remove(objectId) {
        return global.con.collection(this.tableName)
            .findOneAndDelete({ id: objectId });
    }
}
