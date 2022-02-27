import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  postCustomers(data:any){
     return this._http.post<any>("http://localhost:3000/customers",data).pipe(map((res:any)=>{
        return res;
     }))
  }


  deleteCustomers(id:any){

    return this._http.delete<any>("http://localhost:3000/customers/"+id).pipe(map((res:any)=>{
       return res;
    }))
 }

 getCustomers(){
  return this._http.get<any>("http://localhost:3000/customers").pipe(map((res:any)=>{
    console.log(res)
     return res;
  }))
}


 updateCustomers(data:any, id:any){
  return this._http.put<any>("http://localhost:3000/customers/"+id,data).pipe(map((res:any)=>{
     return res;
  }))
}

}
