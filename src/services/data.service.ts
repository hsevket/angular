import { Injectable } from '@angular/core';
import { List } from 'src/types/list';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sharedData: List;
  constructor() { }
}
