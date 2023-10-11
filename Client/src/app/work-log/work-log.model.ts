export interface WorkLog {
    id?: string;
    date: Date;
    isApproved: boolean;
    projectId: number;
    projectName?: string;
}
