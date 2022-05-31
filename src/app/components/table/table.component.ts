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

export class TableProps {
   private _length: number = 0;

   get length() {
      return this._length;
   }

   set length(value) {
      this._length = value;
   }

   constructor() {
   }
}

@Component({
   selector: "app-table",
   templateUrl: "./table.component.html",
   styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, OnChanges {
   @Input() config!: TableConfig;
   @Input() data!: any;
   @Output() eventEmitter = new EventEmitter<TableEvent>();

   filters: TableFilter[] = [];

   currentPage: number = 0;
   pageIndexes!: number[];

   tableProps: TableProps = new TableProps();

   public get orderType(): typeof OrderType {
      return OrderType;
   }

   ngOnInit(): void {
      this.updateData();
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (!changes["data"].currentValue) this.data = changes["data"].previousValue || [];

      this.updateData();
   }

   updateData() {
      this.data = this.data ? [...this.data] : [];

      this.updatePageIndexes();
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

   updatePageIndexes(data: any[] = this.data) {
      const pageCount: number = Math.ceil(data.length / this.config.paginationConfig.itemsPerPage);
      this.pageIndexes = [...Array(pageCount).keys()]
      return this.pageIndexes;
   }

   selectPage(n: number) {
      this.currentPage = n;
   }

   emit(action: TableAction, payload?: any) {
      this.eventEmitter.emit({ action, payload })
   }
}

