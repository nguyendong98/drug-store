import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    name: string;
    phone: string;
    email: string;
    accountId: string;
}
export declare const UserSchema: import("mongoose").Schema<any>;
