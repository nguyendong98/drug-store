import { AppService } from './app.service';
import { SendGridService } from '@anchan828/nest-sendgrid';
export declare class AppController {
    private readonly appService;
    private readonly sendGrid;
    constructor(appService: AppService, sendGrid: SendGridService);
    getHello(): string;
    root(data: any): Promise<void>;
    approve(data: any): Promise<void>;
}
