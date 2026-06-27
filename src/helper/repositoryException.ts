export class RepositoryException extends Error {
    data: unknown;
    context: string;

    constructor(data: unknown, message: string, context: string) {
        super(message);
        this.data = data;
        this.context = context;
    }
}
//# sourceMappingURL=repository.exception.d.ts.map
