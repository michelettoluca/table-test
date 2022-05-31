import { OrderType, TableActionType, TableConfig } from "./table.types";
import { User } from "../../services/data.service";

export const users: TableConfig = {
   headers: [
      { key: "firstName", label: "First name" },
      { key: "lastName", label: "Last name" }
   ],
   order: {
      column: "firstName",
      type: OrderType.asc
   },
   filters: [
      "firstName",
      "lastName"
   ],
   paginationConfig: {
      itemsPerPage: 3
   },
   actions: [
      {
         type: TableActionType.EDIT_ROW,
         label: "Edit",
         row: true,
         show: (user: User) => {
            return user.firstName.toLowerCase().startsWith("lu")
         }
      },
      {
         type: TableActionType.DELETE_ROW,
         label: "Delete",
         row: true,
         show: () => true
      }
   ]
};
