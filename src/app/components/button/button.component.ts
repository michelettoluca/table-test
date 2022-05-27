import { Component, Input, OnInit } from "@angular/core";

export interface ButtonConfig {
    className: string;
    text: string;
    icon?: string;
}

@Component({
    selector: "app-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
    @Input() config!: ButtonConfig;

    constructor() {}
}
