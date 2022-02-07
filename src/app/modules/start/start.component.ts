import { Component } from "@angular/core";

@Component({
    selector: 'app-start',
    template: `<div>
    <nav>
        <a href="/pages">Main page</a>
        <a href="/auth">Auth </a>
        </nav>
    </div>`,
    styles: [`
        div {
            font-size: 48px;
            display: flex;
            justify-content: center;
        }
        a {
            margin-left: 50px;
        }
    `]
})
export class StartComponent {
    
}