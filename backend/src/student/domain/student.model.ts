export class Student {
    constructor(
        public id: number,
        public parentId: number,
        public userId: number, // FK to user table
        public allergies: number[]
    ) { }
}