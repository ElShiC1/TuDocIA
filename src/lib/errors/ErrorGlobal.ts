interface ErrorMetadata {
    code: string;
    status?: number;
    context?: Record<string, unknown>;
}

export class ErrorGlobal extends Error {

    constructor(private readonly type: string, readonly message: string, readonly metadata: ErrorMetadata) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }

    toJSON() {
        const { code, status, ...rest } = this.metadata;

        return ({
            success: false,
            message: this.message,
            timestamp: new Date().toISOString(),
            code: code,
            status: this.metadata.status || 500,
            error: {
                type: this.type,
                ...rest,
            }
        })
    }
}
