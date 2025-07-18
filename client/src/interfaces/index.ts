export interface Project {
    id: number;
    title: string;
    description: string
    status: 'Pending' | 'In  Progress' | 'Completed';
    dueDate?: Date;
    createdAt: Date;
    clientId: number;
    userId: number;
    Client: {
        firstName: string;
        lastName: string;
        email: string;
    }
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