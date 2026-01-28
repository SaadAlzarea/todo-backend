import { Static } from "@sinclair/typebox";
import { VRegisterDto } from "../validation/user.validation";

export interface IRegisterDto extends Static<typeof VRegisterDto> {}
