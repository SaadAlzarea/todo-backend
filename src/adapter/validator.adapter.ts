import { TSchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

export const validator = (schema: TSchema, body: unknown) => {
	const compiler = TypeCompiler.Compile(schema);
	const isValid = compiler.Check(body);
	const error = [...compiler.Errors(body)];
	return { error };
};
