import { OrderType, TableActionType, TableConfig } from "./table.types";

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
        itemsPerPage: 4
    },
    actions: [
        // { type: TableActionType.ADD_ROW, label: "Add" },
        { type: TableActionType.EDIT_ROW, label: "Edit" },
        { type: TableActionType.DELETE_ROW, label: "Delete" }
    ]
};
