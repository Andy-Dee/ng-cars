export class Sale {
    constructor(
        public id: number,
        public code: number,
        public photo: string,
        public name: string,
        public model: string,
        public condition: string,
        public summ: number,
        public status: string
    ) {}
}