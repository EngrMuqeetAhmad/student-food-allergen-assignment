export class MenuItem {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public ingredients: number[],
        public available: boolean
    ) { }
}