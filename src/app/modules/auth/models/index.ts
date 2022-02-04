export namespace AuthModels {
    export namespace User {
        export interface IUser {
            id: number;
            email: string;
            nickname: string;
            password: string;
            role?: string;
        }
    }
    
}