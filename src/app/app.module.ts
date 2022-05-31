import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./services/data.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ButtonComponent } from "./components/button/button.component";
import { TableComponent } from "./components/table/table.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TFilter } from "./components/pipes/table-filter";
import { TSort } from "./components/pipes/table-sort";
import { TPagination } from "./components/pipes/table-pagination";
import { TProps } from "./components/pipes/table-props";

@NgModule({
   declarations: [
      AppComponent,
      ButtonComponent,
      TableComponent,
      TFilter,
      TSort,
      TPagination,
      TProps,
   ],
   imports: [
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(
         InMemoryDataService, { dataEncapsulation: false }
      ),
      BrowserModule,
      AppRoutingModule,
      FormsModule,
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule {
}
