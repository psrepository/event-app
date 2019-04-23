import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EventService} from'./event.service';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
