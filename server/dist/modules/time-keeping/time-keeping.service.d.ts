import { Model } from 'mongoose';
import { Account } from '../auth/interface/auth.interface';
export declare class TimeKeepingService {
    private workShiftModel;
    private accountModel;
    private timeKeepingModel;
    private salaryModel;
    constructor(workShiftModel: Model<any>, accountModel: Model<Account>, timeKeepingModel: Model<any>, salaryModel: Model<any>);
    getAllWorkShift(): Promise<any>;
    createWorkShift(data: any): Promise<any>;
    deleteWorkShift(id: string): Promise<any>;
    getAllCalendar(query: any): Promise<any>;
    createCalendar(data: any): Promise<any>;
    getSalary(): Promise<any[]>;
    createSalary(data: {
        valueOfHour: number;
    }): Promise<any>;
    updateSalary(id: string, data: {
        valueOfHour: number;
    }): Promise<any>;
    getCalendarOfStaff(id: string): Promise<any>;
    confirmCalendar(data: {
        idStaff: string;
        idWorkShift: string;
        date: any;
    }): Promise<any>;
}
