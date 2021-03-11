import { StatisticalService } from './statistical.service';
export declare class StatisticalController {
    private statisticalService;
    constructor(statisticalService: StatisticalService);
    getRevenue(query?: {
        year: number;
    }): Promise<any>;
    getRevenueByDate(query?: {
        from: any;
        to: any;
    }): Promise<any>;
    getUserByMonth(query?: {
        month: number;
        year: number;
    }): Promise<any>;
}
