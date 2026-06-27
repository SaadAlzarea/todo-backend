import type { TSchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { AppError } from "../middleware";
import { BAD_REQUEST } from "../utils";

export const validator = (schema: TSchema, body: unknown, message?: string, code?: string) => {
    const compiler = TypeCompiler.Compile(schema);
    const error = [...compiler.Errors(body)];

    if (error.length > 0) {
        throw new AppError(
            message ?? `Validation error // error message : ${error[0]?.message}`,
            BAD_REQUEST,
            code,
        );
    }

    return { error };
};
