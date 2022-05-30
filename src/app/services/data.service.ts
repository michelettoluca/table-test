import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

export interface User {
    id?: number,
    firstName: string,
    lastName: string
}


@Injectable({
    providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const users: User[] = [
            { id: 12, firstName: "Mario", lastName: "Rossi" },
            { id: 13, firstName: "Pietro", lastName: "Smusi" },
            { id: 14, firstName: "Orazio", lastName: "Grinzosi" },
            { id: 15, firstName: "Luca", lastName: "Micheletto" },
            { id: 16, firstName: "Silvio", lastName: "Berlusconi" },
            { id: 17, firstName: "Mario", lastName: "Balotelli" },
            { id: 18, firstName: "Benedetta", lastName: "Parodi" },
        ];

        return { users };
    }

    genId(users: User[]): number {
        return users.length > 0 ? Math.max(...users.map(user => user.id!)) + 1 : 11;
    }
}
