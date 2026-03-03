import { Static } from "@sinclair/typebox";
import { VLoginDto, VRegisterDto } from "../validation/user.validation";

export interface IRegisterDto extends Static<typeof VRegisterDto> {}
export interface ILoginDto extends Static<typeof VLoginDto> {}
