import { Document } from 'mongoose';
export interface ProductCategoryGroup extends Document {
    readonly _id: string;
    readonly name: string;
    categories: any;
    readonly description: string;
    readonly createAt?: Date;
}
