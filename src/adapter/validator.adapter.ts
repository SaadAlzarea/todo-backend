import { TSchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { AppError } from "../middleware/errorMiddleware.middleware";
import { BAD_REQUEST } from "../utils/http-status";

export const validator = (schema: TSchema, body: unknown) => {
    const compiler = TypeCompiler.Compile(schema);
    // const isValid = compiler.Check(body);
    const error = [...compiler.Errors(body)];

    if (error.length > 0) {
        console.log();
        throw new AppError(
            `Validation error (validator error) // error message : ${error[0]?.message}`,
            BAD_REQUEST,
        );
    }
    return { error };
};
