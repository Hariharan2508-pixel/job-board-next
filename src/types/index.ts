export interface Job {
    id: string;
    title: string;
    company: Company;
    minSalary: number;
    maxSalary: number;
    status: JobStatus;
    type:string;
    location:string
}
export interface User {
    id: number;
    name: string;
    email: string;
}
export interface Company {
    logo:string;
    name: string;
    location: string
}
export type JobStatus = "open" | "closed" | "draft";