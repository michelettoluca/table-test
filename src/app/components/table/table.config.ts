import { OrderType, TableAction, TableConfig } from "./table.types";

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
    availableActions: [
        TableAction.EDIT_ROW,
        TableAction.DELETE_ROW,
        TableAction.ADD_ROW
    ]
};
