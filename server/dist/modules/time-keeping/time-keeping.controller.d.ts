import { TimeKeepingService } from './time-keeping.service';
export declare class TimeKeepingController {
    private timeKeepingService;
    constructor(timeKeepingService: TimeKeepingService);
    getAllWorkShift(): Promise<any>;
    createWorkShift(data: any): Promise<any>;
    deleteWorkShift(id: any): Promise<any>;
    createCalendar(data: any): Promise<any>;
    getAllCalendar(query?: {
        date: any;
        weekFromDate: any;
        weekToDate: any;
    }): Promise<any>;
    confirmCalendar(data: {
        idStaff: string;
        idWorkShift: string;
        date: any;
    }): Promise<any>;
    createSalary(data: {
        valueOfHour: number;
    }): Promise<any>;
    updateSalary(id: any, data: {
        valueOfHour: number;
    }): Promise<any>;
    getCalendarOfStaff(id: any): Promise<any>;
    getSalary(): Promise<any[]>;
}
