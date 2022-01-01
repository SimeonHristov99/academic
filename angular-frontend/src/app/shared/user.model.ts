import { Course } from "./course.model";
import { v4 as uuidv4 } from 'uuid'

export class User {
    id: string

    constructor(
        public email: string,
        public firstname: string,
        public lastname: string,
        public password?: string,
        public birthDate?: Date,
        public role?: string,
        public courses?: Course[],
        public certificates?: Course[],
        
    ) {
        this.id = uuidv4()
    }
}