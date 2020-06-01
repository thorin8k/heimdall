
/**
 * Crear un dao con esta estructura pero contra MongoDB
 * 
 * TODO test
 */
export default class BaseDao {

    constructor(tableName) {
        this.tableName = tableName;
    }

    loadAllData() {
        return global.con.collection(this.tableName).find().toArray();
    }
    loadFilteredData(filters, start, limit) {
        return global.con.collection(this.tableName).find({ ...filters }).skip(start).limit(limit).toArray();
    }
    loadById(objectId) {
        return global.con.collection(this.tableName).find({ id: objectId }).toArray();
    }
    save(object) {
        return global.con.collection(this.tableName).insertOne({ ...object });
    }
    update(objectId, newObject) {
        return global.con.collection(this.tableName)
            .findOneAndUpdate({ id: objectId }, { ...newObject });
    }
    remove(objectId) {
        return global.con.collection(this.tableName)
            .findOneAndDelete({ id: objectId });
    }
}
