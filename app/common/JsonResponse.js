export class JsonResponse {
    constructor(status, data, message, total) {
        this.data = data;
        this.status = status;
        this.total = total;
        this.message = message || '';
        this.success = true;
    }

    toJson() {
        return (this);
    }
};
