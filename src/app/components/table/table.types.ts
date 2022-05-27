export interface TableConfig {
    headers: TableHeader[];
    order: Order;
    filters: string[];
    paginationConfig: PaginationConfig;
    availableActions: TableAction[];
}

export interface TableHeader {
    key: string;
    label: string;
}

export interface Order {
    column: string;
    type: OrderType;
}

export enum OrderType {
    asc = -1,
    none = 0,
    desc = 1,
}

export interface TableFilter {
    column: string;
    value: string;
}

export interface TableData {
    [key: string]: any;
}

export interface PaginationConfig {
    itemsPerPage: number;
    itemPerPageOptions?: number[];
}

export interface TableEvent {
    action: TableAction;
    payload?: any;
}

export enum TableAction {
    ADD_ROW,
    EDIT_ROW,
    DELETE_ROW
}

