import { $ZodIssue } from "zod/v4/core";

interface ErrorMetadata {
    code: string;
    status?: number;
    context?: Record<string, unknown>;
}

export class ErrorDto extends Error {
    public readonly metadata: ErrorMetadata;

    constructor(
        private readonly type: string,
        metadata: ErrorMetadata,
        private readonly issues?: $ZodIssue[]
    ) {
        const message = `Valores inválidos en los campos ${issues?.map((val) => val.path?.[0] ?? 'desconocido').join(' - ') || 'desconocido'
            }`;

        super(message);

        this.name = 'ErrorDto';
        this.message = message;
        this.metadata = metadata;

        this.metadata.context = issues?.reduce((acc, issue) => {
            acc[issue.path.join('.')] = issue.message;
            return acc;
        }, metadata.context || {});

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
