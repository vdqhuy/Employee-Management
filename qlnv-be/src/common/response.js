export class Resp {
    code;
    message;
    data;
    result;
    res;
    constructor(res, code, message, data = null) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.res = res
        this.result = res.json({
            code: this.code,
            message: this.message,
            data: this.data
        });
    }
}

export class ReE {
    code;
    message;
    errors;
    result;
    res;
    constructor(res, code, message, errors = []) {
        this.code = code;
        this.message = message;
        this.errors = errors;
        this.res = res
        this.result = res.json({
            code: this.code,
            message: this.message,
            errors: this.errors
        });
    }
}