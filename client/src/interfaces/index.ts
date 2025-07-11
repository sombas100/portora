export interface Project {
    id: number;
    title: string;
    description: string
    status: 'Pending' | 'In  Progress' | 'Completed';
    dueDate?: Date;
    clientId: number;
    userId: number;
}