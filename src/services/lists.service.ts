import { Injectable } from '@angular/core';
import { List } from '../types/list';
import{Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ListsService {
  
  constructor 
  (private http :HttpClient){}
  
  getList():Observable<List[]>{
    return this.http.get<List[]>
    ('https://ic5t082w58.execute-api.eu-west-1.amazonaws.com/production/api/v1/2021Angular');

  }
 
  add(list: List):Observable<object>{
    return this.http.post<object>('https://ic5t082w58.execute-api.eu-west-1.amazonaws.com/production/api/v1/2021Angular', 
    {
      "id": list.id,
      "name":list.name
  })
  }

  delete(list:List):Observable<any>{
    return this.http.delete('https://ic5t082w58.execute-api.eu-west-1.amazonaws.com/production/api/v1/2021Angular'+'/'+list.id)
  }
}
