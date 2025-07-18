export interface Project {
    id: number;
    title: string;
    description: string
    status: 'Pending' | 'In  Progress' | 'Completed';
    dueDate?: Date;
    clientId: number;
    userId: number;
}

export interface Client {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    emailVerified: boolean;
    clientId: number;
}