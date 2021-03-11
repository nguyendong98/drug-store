import { FeedbackService } from './feedback.service';
import { FeedbackCredentialsDto } from './dto/feedback.credentials.dto';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    getAll(query?: {
        product?: string;
        pageNumber?: number;
        pageSize?: number;
    }): Promise<any>;
    createFeedback(req: any, feedbackCredentialsDto: FeedbackCredentialsDto): Promise<import("./interface/feedback.interface").Feedback>;
}
