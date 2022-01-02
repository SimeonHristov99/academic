import { Course } from "./course.model";

export interface User {
    id: string
    email: string,
    firstname: string,
    lastname: string,
    password?: string,
    birthDate?: Date,
    role?: string,
    courses?: Course[],
    certificates?: Course[],
}