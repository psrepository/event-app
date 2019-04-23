import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseurl:string="http://localhost:8080";
  constructor(private _http:HttpClient) {  }

   getEvents(requestParams) {
    return this._http.get(this.baseurl+'/events', {params: requestParams});
    
   }
}
