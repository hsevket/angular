
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { IdService } from 'src/services/id.service';
import { ListsService } from '../../services/lists.service';
import { List } from '../../types/list';





@Component({

  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.css']
})
export class MainListComponent implements OnInit {
  lists: List[];
  list: List;
  id: string = '';
  @Input() selected: List;

  constructor(
    private listservice: ListsService,
    private dataservice: DataService,
    private Id:IdService
  ) {
  }
  

  addMainList(value: string): void {
    
    let newItem = new List(value, this.Id.getId());
    this.listservice.add(newItem).subscribe(() => this.lists.push(newItem));
    
  }
  onSelect(item: List) {
    this.dataservice.sharedData = item;
  }

  getList(): void {
    this.listservice.getList().subscribe(lists => this.lists = lists);
  }

  ngOnInit(): void {
    this.getList();

  }
  delete(list: List) {
    this.listservice.delete(list).subscribe(() => this.lists = this.lists.filter(x => x !== list));
  }
}
