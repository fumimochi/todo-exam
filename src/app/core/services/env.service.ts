import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";

export const EVIRONMENT  = new InjectionToken<{ [key: string]: any}>('environment');

@Injectable({
    providedIn: 'root',
})
export class EnvService {
    private readonly _environment: any;

    // constructor(@Optional() @Inject(ENVIRONMENT) environment: any) {
    //     this._environment = environment !== null ? environment : {};
    // } 

    getValue(key: string, defaultValue?: any): any {
        return this._environment[key] || defaultValue;
    }
}

