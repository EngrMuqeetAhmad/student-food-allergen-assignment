export class Student {
    constructor(
        public id: number,
        public name: string,
        public parentId: number,
        public allergyIds: number[]
    ) { }
}