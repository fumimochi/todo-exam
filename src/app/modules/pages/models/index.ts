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

    export const EntityDetailsRoutes: Object = {
        todo: 'todo_details',
        users: 'users_details',
        categories: 'categories_details'
    }

    export interface INav {
        title: string, 
        route: string
    }

}