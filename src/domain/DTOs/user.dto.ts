import { Static } from "@sinclair/typebox";
import { VRegisterDto } from "../validation/register.validation";

export interface IRegisterDto extends Static<typeof VRegisterDto>{}