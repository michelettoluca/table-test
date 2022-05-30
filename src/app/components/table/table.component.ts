import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import {
    OrderType,
    TableAction,
    TableActionType,
    TableConfig,
    TableData,
    TableEvent,
    TableFilter
} from "./table.types";

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, OnChanges {
    @Input() config!: TableConfig;
    @Input() data!: any;
    @Output() eventEmitter = new EventEmitter<TableEvent>();

    displayedData!: any[];
    filters: TableFilter[] = [];

    currentPage: number = 0;
    pageIndexes!: number[];

    public get orderType(): typeof OrderType {
        return OrderType;
    }

    ngOnInit(): void {
        this.updateData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.["data"].currentValue !== null) this.updateData();
    }

    updateData() {
        this.displayedData = this.data;

        this.filterData();
        this.sortData();
        this.updatePageIndexes();
    }

    filterData() {
        this.displayedData = this.displayedData?.filter((row) => {
            if (this.filters.length === 0) return true;

            let includeRow = false;

            for (const filter of this.filters) {
                if (row[filter.column]) {
                    const rowValue = row[filter.column].toLowerCase();
                    const filterValue = filter.value.toLowerCase();

                    includeRow = includeRow || rowValue.includes(filterValue);
                }
            }

            return includeRow;
        }) || [];

        this.currentPage = 0;
    }

    addFilter(column: string, value: string) {
        const _value = value.trim();
        if (_value && !this.filters.find(f => f.column === column && f.value === value)) {
            this.filters.push({
                column, value: _value
            })
        }

        this.updateData();
    }

    removeFilter(filter: TableFilter) {
        this.filters = this.filters.filter(f => !(f.column === filter.column && f.value === filter.value))

        this.updateData();
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

    emit(action: TableAction, payload?: any) {
        this.eventEmitter.emit({ action, payload })
    }
}

