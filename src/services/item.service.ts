import { Injectable } from '@angular/core';
import{Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListItem } from 'src/types/listItem';



@Injectable({
  providedIn: 'root'
})
export class ItemService {
  
  constructor 
  (private http :HttpClient){}
  
  getList(id:string):Observable<object>{
    return this.http.get<object>
    ('https://ic5t082w58.execute-api.eu-west-1.amazonaws.com/production/api/v1/2021Angular'+'/'+id);

  }
  
  add(id:string, item:ListItem):Observable<ListItem>{
    return this.http.post<ListItem>('https://ic5t082w58.execute-api.eu-west-1.amazonaws.com/production/api/v1/2021Angular'+'/'+id, 
    {
      "id": item.id,
      "name":item.name,
      "qty":item.qty,
      "completed":item.completed
  })
  }
  delete(id:string, item:ListItem):Observable<any>{
    return this.http.delete('https://ic5t082w58.execute-api.eu-west-1.amazonaws.com/production/api/v1/2021Angular'+'/'+id+'/'+item.id)
  }
  update(id:string, item:ListItem):Observable<object>{
    return this.http.put<object>
    ('https://ic5t082w58.execute-api.eu-west-1.amazonaws.com/production/api/v1/2021Angular'+'/'+id+'/'+item.id, 
    {
      "qty":item.qty,
      "completed":item.completed
    })
  }

}
