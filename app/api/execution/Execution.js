import { BaseModel } from '../base';

/**
 * Las ejecuciones registran los resultados de correr un Job.
 */
export class Execution extends BaseModel {

    static get STATUS_FAIL() { return 'failed' };
    static get STATUS_STOPPED() { return 'stopped' };
    static get STATUS_RUNNING() { return 'running' };
    static get STATUS_SUCCESS() { return 'success' };
    static get STATUS_QUEUED() { return 'queued' };

    constructor(id, job, date, tags, results, logs, status) {
        super(id);

        this.job = job;
        this.date = date;
        this.tags = tags;
        this.results = results; //Aqui van los tests, los artifacts, etc
        this.logs = logs;
        this.status = status;
    }



}