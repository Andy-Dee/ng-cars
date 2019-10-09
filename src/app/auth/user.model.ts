export class User {
    constructor(
        public email: string,
        public uid: string,
        public displayName?: string
    ) {}
}