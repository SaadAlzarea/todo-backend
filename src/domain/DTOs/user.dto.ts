import { Static } from "@sinclair/typebox";
import { VRegisterDto, VLoginDto } from "../validation";

export interface IRegisterDto extends Static<typeof VRegisterDto> {}
export interface ILoginDto extends Static<typeof VLoginDto> {}
