import { BaseModel } from '../base';

/**
 * Los comandos son scripts a ejecutar para realizar acciones.
 * 
 * Actualmente hay dos tipos, Script y Ejecutable.
 * 
 * El tipo 'script' ejecuta un shell script en el sistema operativo correspondiente. Será necesario escribirlo acorde
 * al SO objetivo
 * 
 * El tipo 'ejecutable' ejecuta un comando con unos parámetros
 *  
 * 
 * TODO implementar una forma de que un comando pueda ser sobreescrito en la configuración de un agent
 */
export class Command extends BaseModel {

    static get TYPE_SCRIPT() { return 'script' }
    static get TYPE_EXECUTABLE() { return 'executable' }

    constructor(id, name, type, executable, params, script, configs) {
        super(id);

        this.name = name;
        this.type = type;
        this.executable = executable;
        this.params = params;
        this.script = script;
        this.configs = configs;
    }


}