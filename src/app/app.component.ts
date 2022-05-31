import { Component, OnInit } from "@angular/core";
import * as tableConfig from "./components/table/table.config";
import { Observable } from "rxjs";
import { User } from "./services/data.service";
import { UsersService } from "./services/users.service";
import { TableActionType, TableEvent } from "./components/table/table.types";

@Component({
   selector: "app-root",
   templateUrl: "./app.component.html",
   styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
   usersTable = tableConfig.users;

   users$!: Observable<User[]>;

   tmpEditUser: User | null = null;
   tmpAddUser: User = { firstName: "", lastName: "" };

   constructor(private usersService: UsersService) {
   }

   ngOnInit(): void {
      this.updateData();
   }

   updateData() {
      this.users$ = this.usersService.findAll();
   }

   handleEvent(event: TableEvent) {
      switch (event.action.type) {
         case TableActionType.EDIT_ROW: {
            this.tmpEditUser = event.payload;

            break;
         }

         case TableActionType.DELETE_ROW: {
            const user: User = event.payload;

            this.usersService.delete(user.id!).subscribe();
            break;
         }
      }

      this.updateData();
   }

   addUser() {
      this.usersService.add(this.tmpAddUser).subscribe({
         next: () => {
            this.tmpAddUser = { firstName: "", lastName: "" };
            this.updateData();
         }
      });
   }

   editUser() {
      this.usersService.edit(this.tmpEditUser!).subscribe({
         next: () => {
            this.tmpEditUser = null;
            this.updateData();
         }
      });
   }
}
