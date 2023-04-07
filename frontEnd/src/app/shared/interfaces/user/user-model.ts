export interface IUserModel {
    id: string;
    name: string;
    email: string;
    access_level: string;
    approved_by: string | null;
}
