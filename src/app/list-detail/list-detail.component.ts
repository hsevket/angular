import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { IdService } from 'src/services/id.service';

import { ItemService } from 'src/services/item.service';
import { ListsService } from 'src/services/lists.service';
import { List } from 'src/types/list';
import { ListItem } from 'src/types/listItem';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  items: ListItem[];
  item: ListItem;
  selectedList: List;
  ListId: string = this.route.snapshot.paramMap.get('id');

  constructor(
    private itemService: ItemService,
    private dataservice: DataService,
    private listService: ListsService,
    private Id: IdService,
    private route: ActivatedRoute) { }



  eventCheck(item: ListItem) {
    item.completed = !item.completed;
    this.itemService.update(this.ListId, item).subscribe();
    console.log(item)
  }

  getList(): void {

    this.listService.getList().subscribe((lists) => {
      this.selectedList = lists.filter((l) => {
        return l.id === this.ListId;
      })[0];
      this.itemService.getList(this.ListId).subscribe(x => this.items = x['items']);
    })
  }
  ngOnInit(): void {
    this.selectedList = this.dataservice.sharedData
    this.getList();

  }
  addToList(value: string): void {
    let newItem = new ListItem(value, this.Id.getId());
    this.items.push(newItem);
    this.itemService.add(this.ListId, newItem).subscribe();
  }
  filterCom() {
    this.itemService.getList(this.ListId).subscribe(x => {
      this.items = x['items'];
      this.items = this.items.filter(x => x.completed !== false);

    });

  }
  filterUn() {
    this.itemService.getList(this.ListId).subscribe(x => {
      this.items = x['items'];
      this.items = this.items.filter(x => x.completed !== true);

    });
  }

  increase(item: ListItem) {
    item.qty++;
    this.itemService.update(this.ListId, item).subscribe()
  }
  decrease(item: ListItem) {
    item.qty--;
    this.itemService.update(this.ListId, item).subscribe()
  }
  delete(item: ListItem) {
    this.itemService.delete(this.ListId, item).subscribe(() => this.items = this.items.filter(x => x !== item));

  }
}
