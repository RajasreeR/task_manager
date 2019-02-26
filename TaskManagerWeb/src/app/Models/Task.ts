export class Task{ 
    id: number;   
    name: string;
    priority: number;
    parentTask : string;
    parentTaskId: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}