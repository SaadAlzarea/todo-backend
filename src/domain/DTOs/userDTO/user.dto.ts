import type { Static } from "@sinclair/typebox";
import type { VLoginDto, VRegisterDto } from "../../validation";

export interface IRegisterDto extends Static<typeof VRegisterDto> {}
export interface ILoginDto extends Static<typeof VLoginDto> {}
