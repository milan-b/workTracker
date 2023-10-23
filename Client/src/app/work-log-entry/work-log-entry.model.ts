import { WorkLog } from "../work-log/work-log.model";

export interface WorkLogEntry {
    id: string | null;
    workLogId: string;
    //workLog?: WorkLog;
    productId: number;
    productName?: string;
    amount: number;
    unit?: string;
    note?: string;
}
