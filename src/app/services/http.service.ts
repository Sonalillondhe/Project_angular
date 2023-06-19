import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl:string="https://devrunner.co.in/machine_test/index.php/web_api/Users/";

  httpHeader:HttpHeaders = new HttpHeaders().set("Content-Type", "multipart/form-data");

  httpheader2:HttpHeaders =new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http:HttpClient) { }
 
  saveDataToServer(endPoint:string,data:any)
  {
     const url = this.baseUrl + endPoint ;
     return this.http.post(url,data);
  }

  getDataFromServer(endPoint:string)
  {
      const url = this.baseUrl + endPoint;
   return this.http.get(url,{headers:this.httpHeader});
  }
  
  DeleteDataFromserver(endPoint: string) 
  {   
    const url = this.baseUrl + endPoint;
    return this.http.delete(url,{ headers: this.httpheader2 });
  }
 
}

