import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./data.service";
import { catchError, Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class UsersService {
    private usersUrl = "api/users"

    private httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    constructor(private http: HttpClient) {
    }

    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            console.error(operation, error);
            return of(result as T);
        };
    }

    findAll() {
        return this.http.get<User[]>(this.usersUrl).pipe(
            catchError(this.handleError<User[]>("getUsers", []))
        );
    }

    findOneById(id: number): Observable<User> {
        return this.http.get<User>(`${this.usersUrl}/${id}`).pipe(
            catchError(this.handleError<User>(`getUser id=${id}`))
        );
    }

    add(user: User): Observable<User> {
        console.log(user)
        return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
            catchError(this.handleError<User>("addUser"))
        );
    }

    edit(user: User): Observable<any> {
        return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
            catchError(this.handleError<any>("updateUser"))
        );
    }

    delete(id: number): Observable<User> {
        return this.http.delete<User>(`${this.usersUrl}/${id}`, this.httpOptions).pipe(
            catchError(this.handleError<User>("deleteUser"))
        );
    }

}
