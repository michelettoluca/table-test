import { Component } from "@angular/core";
import * as buttonConfig from "./components/button/button.config";
import * as tableConfig from "./components/table/table.config";
import { TableData, TableFilter } from "./components/table/table.types";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    usersTable = tableConfig.users;

    log(arg: any) {
        console.log(arg)
    }

    tableData: TableData[] = [
        { firstName: "Mario", lastName: "Rossi" },
        { firstName: "Pietro", lastName: "Smusi" },
        { firstName: "Orazio", lastName: "Grinzosi" },
        { firstName: "Luca", lastName: "Micheletto" },
        { firstName: "Silvio", lastName: "Berlusconi" },
        { firstName: "Mario", lastName: "Balotelli" },
        { firstName: "Benedetta", lastName: "Parodi" }
    ];
}
