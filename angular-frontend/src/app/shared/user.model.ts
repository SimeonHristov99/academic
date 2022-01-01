import { Course } from "./course.model";
import { v4 as uuidv4 } from 'uuid'

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