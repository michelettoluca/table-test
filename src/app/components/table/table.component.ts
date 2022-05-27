import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { OrderType, TableAction, TableConfig, TableData, TableEvent, TableFilter } from "./table.types";

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
    @Input() config!: TableConfig;
    @Input() data!: TableData[];
    @Output() eventEmitter = new EventEmitter<TableEvent>();

    displayedData!: TableData[];
    filters!: TableFilter[];

    currentPage: number = 0;
    pageIndexes!: number[];

    tmpRow: TableData = {};

    public get orderType(): typeof OrderType {
        return OrderType;
    }

    public get tableAction(): typeof TableAction {
        return TableAction;
    }

    ngOnInit(): void {
        this.filters = this.config.filters.map((column) => ({
            column,
            value: ""
        }))

        this.updateData()
    }

    updateData() {
        this.displayedData = this.data;

        this.filterData();
        this.sortData();
        this.updatePageIndexes();
    }

    filterData() {
        this.displayedData = this.displayedData.filter((row) => {
            let includeRow = true;

            for (const filter of this.filters) {
                if (row[filter.column]) {
                    const rowValue = row[filter.column].toLowerCase();
                    const filterValue = filter.value.toLowerCase();

                    includeRow = includeRow && rowValue.includes(filterValue);
                }
            }

            return includeRow;
        })

        this.currentPage = 0;
    }

    nextOrderType(): OrderType {
        switch (this.config.order.type) {
            case OrderType.asc:
                return OrderType.desc;
            case OrderType.desc:
                return OrderType.none;
            default:
                return OrderType.asc;
        }
    }

    toggleOrder(key: string) {
        if (key === this.config.order.column) {
            this.config.order.type = this.nextOrderType();
        } else {
            this.config.order.column = key;
            this.config.order.type = OrderType.asc;
        }

        this.updateData();
    }

    sortData() {
        const orderKey = this.config.order.column;
        const orderType = this.config.order.type;

        if (orderType !== OrderType.none) {
            this.displayedData.sort((a, b) =>
                a[orderKey].toLowerCase() >= b[orderKey].toLowerCase()
                    ? -1 * orderType
                    : 1 * orderType
            );
        }
    }

    updatePageIndexes() {
        const pageCount: number = Math.ceil(this.displayedData.length / this.config.paginationConfig.itemsPerPage);
        this.pageIndexes = [...Array(pageCount).keys()]
    }

    selectPage(n: number) {
        this.currentPage = n;
    }

    handleDeleteRow(row: TableData) {
        this.eventEmitter.emit({
            action: TableAction.DELETE_ROW,
            payload: {
                row
            }
        })
    }

    handleEditRow(row: TableData) {
        this.eventEmitter.emit({
            action: TableAction.EDIT_ROW,
            payload: {
                row
            }
        })
    }

    handleAddRow() {
        this.eventEmitter.emit({
            action: TableAction.ADD_ROW,
            payload: {
                row: this.tmpRow
            }
        })
    }
}

