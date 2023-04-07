export interface IUserModel {
    id: string;
    name: string;
    email: string;
    access_level: string;
    created_by: string | null;
}
