import {Document} from 'mongoose';

export interface ProductCategory extends Document {
    readonly _id: string;
    readonly idGroup: string;
    readonly name: string;
    readonly description: string;
    readonly createAt?: Date;
}

