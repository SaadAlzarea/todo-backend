import { TSchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { AppError } from "../middleware/errorMiddleware.middleware";
import { BAD_REQUEST } from "../utils/http-status";

export const validator = (schema: TSchema, body: unknown) => {
    const compiler = TypeCompiler.Compile(schema);
    // const isValid = compiler.Check(body);
    const error = [...compiler.Errors(body)];

    if (error.length > 0) {
        throw new AppError(`Validation error`, BAD_REQUEST);
    }
    return { error };
};
