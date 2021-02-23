import { Document } from 'mongoose';


export interface Role extends Document{
    readonly _id: string;
    readonly description: string;
}
export interface Account extends Document {
    readonly _id: string;
    readonly fullName?: string;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly avatar?: string;
    readonly roleId: string;
    readonly phone: string;
    readonly createAt: string;
}
export interface AccountResponse{
    readonly effectArrows: number;
}
