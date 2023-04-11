import { IAuthRequestInput } from "./login-request";

export interface IRegisterRequestInput extends IAuthRequestInput {
    name: string;
    access_level: string;
}
