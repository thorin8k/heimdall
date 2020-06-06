import { BaseModel } from '../base';

/**
 * Los jobs se asocian a los proyectos y son una lista de comandos a ejecutar
 * 
 */
export class Job extends BaseModel {

    
    static get TYPE_BUILD() { return 'build' };
    static get TYPE_DEPLOY() { return 'deploy' };

    constructor(id, project, name, commands, agents, configs) {
        super(id);

        this.project = project;
        this.name = name;
        this.commands = commands;
        this.agents = agents;
        this.configs = configs;
    }

}