export interface WorkLogPerson {
    personId: string;
    entry: WorkLogPersonEntry[];
}

interface WorkLogPersonEntry{
    date: Date;
    hours: number;
}