import { Component } from '@angular/core';
import { EventService } from './event.service';
import {GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'event-app';
  pageSize:number=5;
  noOfPages: Array<number>;
  gridApi: GridApi;
  gridColumnApi;

  eventService;

  constructor(private _eventService: EventService) {
     this.eventService = _eventService;
  }

  columnDefs = [
    {headerName: 'Id', field: 'id'},
    {headerName: 'Created At', field: 'createdAt', sortable: true, filter: false },
    {headerName: 'Type', field: 'type', sortable: true, filter: "agTextColumnFilter", filterParams: {filterOptions: ["contains"], suppressAndOrCondition: true}},
    {headerName: 'Source', field: 'source', sortable: true, filter: false},
    {headerName: 'Details', field: 'details', sortable:true, filter: false}
  ];

  gridOptions: GridOptions = {
    pagination: true,
    enableServerSideFilter: true,
    rowModelType: 'infinite',
    cacheBlockSize: this.pageSize,
    paginationPageSize: this.pageSize    
  };

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      console.log(params);
      const requestParams = <IRequestParam> {
        startRow : params.startRow,
        pageSize : this.pageSize,
      }
     if(params.filterModel.type) {
      requestParams.searchValue = params.filterModel.type.filter;
     }
     if(params.sortModel[0]) {
      requestParams.sortColumn = params.sortModel[0].colId;
      requestParams.sortDirection = params.sortModel[0].sort;
     }
      this.eventService.getEvents(requestParams)
        .subscribe( response => {
          params.successCallback(
            response.content,
            response.totalElements
          );
        });
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
  }
}

export interface IRequestParam {
  startRow: number,
  pageSize: number,
  searchValue: string,
  sortColumn: string,
  sortDirection: string
}
