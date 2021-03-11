import * as mongoose from 'mongoose';
export declare const databaseProviders: {
    useFactory: () => Promise<typeof mongoose>;
}[];
