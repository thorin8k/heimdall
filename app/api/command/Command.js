import { BaseModel } from '../base';

/**
 * Los comandos son scripts a ejecutar para realizar acciones.
 * 
 * Pueden estar predefinidos en el sistema (TYPE_PREDEFINED) o haber sido
 * introducidos por el usuario a la hora de generar un job (TYPE_CUSTOM).
 * 
 * 
 * 
 * TODO pensar como implementar temas de multi plataforma 
 */
export class Command extends BaseModel {

    static get TYPE_PREDEFINED() { return 'predefined' }
    static get TYPE_CUSTOM() { return 'custom' }

    constructor(id, name, type, script) {
        super(id);

        this.name = name;
        this.type = type;
        this.script = script;
    }


}