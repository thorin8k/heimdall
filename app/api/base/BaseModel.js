export class BaseModel {

    constructor(id) {
        this.id = id;
    }

    /**
     * Utilidad para construir en base a un objeto plano.
     * 
     * Esto permite extender este metodo para realizar validaciones personalizadas en los modelos especificos
     * @param {*} object 
     */
    static fromObject(object) {
        let obj = new this();
        for (var idx in object) {
            obj[idx] = object[idx];
        }

        return obj;
    }
}