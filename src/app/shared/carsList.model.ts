export class CarsList {
    constructor(
        public id: number,
        public brand: string,
        public model: string,
        public modification: string,
        public year: number,
        public capacity: number,
        public model_image_path: string, 
        public vin: number
    ) {}
}