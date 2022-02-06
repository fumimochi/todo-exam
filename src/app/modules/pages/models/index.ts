export namespace PagesModels {
    export namespace Todo {
        export interface ITodo {
            id?: number,
            title: string,
            description: string,
            done: boolean,
            category: string
        }
    }
    
   export namespace Category {
        export interface ICategories {
            id?: number,
            title: string, 
            description: string
        }
    }

}