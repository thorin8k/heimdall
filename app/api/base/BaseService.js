
import { BaseDao } from './';


export class BaseService {

    constructor(tableName) {
        this.mainDao = new BaseDao(tableName);
    }
    /**
     * Obtencion de una lista de elementos.
     *
     * filters, es opcionale. Si no se pasan se devuelve lo que hay (undefined);
     */
    list(filters, request, response) {
        if (filters && Object.keys(filters).length !== 0) {
            //Pagination
            var start = request && request.query.start ? request.query.start : 0;
            var limit = request && request.query.limit ? request.query.limit : 1000;//Default limit
            return this.mainDao.loadFilteredData(filters, start, limit);
        }
        return this.mainDao.loadAllData();
    }
    /**
     * Obtencion de un elemento mediante su identificador
     */
    getById(id) {
        return this.mainDao.loadById(id);
    }
    /**
     * Metodo de creacion.
     *
     * Si el identificador se pasa como undefined se creara un nuevo elemento,
     * sino se modifica el correspondiente.
     */
    save(id, data) {
        if (id) {
            //Update
            return this.mainDao.update(id, data);
        }
        //Create
        return this.mainDao.save(data);
    }
    /**
     * Metodo de eliminado.
     *
     * El identificador es obligatorio para poder localizar el elemento a eliminar.
     */
    remove(id) {
        if (id) {
            return this.mainDao.remove(id);
        }
    }
}

