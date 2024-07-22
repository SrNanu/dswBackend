import { ObjectId } from "mongodb";

export class HealthInsurance {
    constructor(
        public name: string, 
        public code: number,
    ) {}

}