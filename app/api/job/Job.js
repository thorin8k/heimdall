import { BaseModel } from '../base';

/**
 * Los jobs se asocian a los proyectos y son una lista de comandos a ejecutar
 * 
 */
export class Job extends BaseModel {

    constructor(id, project, name, commands, configs) {
        super(id);

        this.project = project;
        this.name = name;
        this.commands = commands;
        this.configs = configs;
    }


    addCommand(comand) {
        if (!this.commands) {
            this.commands = [];
        }
        //TODO check if already exists
        this.commands.push(command);
    }

}