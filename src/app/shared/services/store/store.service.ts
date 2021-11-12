import { Injectable } from '@angular/core';
import { BehaviorSubject, groupBy, mergeMap, Observable, of, Subject, toArray } from 'rxjs';
import * as _ from 'lodash';
import { CodeEnum } from '../../enums/code.enum';

export interface Item {
  id: string;
  name: string;
  description: string;
  availableCount: number;
  countToBuy: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public messageSubject: Subject<CodeEnum> = new Subject();
  public cartSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private cartList: Item[] = [];
  private itemList: Item[] = [
    {
      id: '1',
      name: 'Name 1',
      description: 'Description 1',
      availableCount: 3,
      countToBuy: 0
    },
    {
      id: '2',
      name: 'Name 2',
      description: 'Description 2',
      availableCount: 3,
      countToBuy: 0
    },
    {
      id: '3',
      name: 'Name 3',
      description: 'Description 3',
      availableCount: 5,
      countToBuy: 0
    },
    {
      id: '4',
      name: 'Name 4',
      description: 'Description 4',
      availableCount: 0,
      countToBuy: 0
    }
  ]

  constructor() { }

  public getItemList(): Observable<Item[]> {
    return of(this.itemList);
  }

  public getCartList(): Observable<Item[]> {
    return of(this.cartList)
  }

  public addItemToCart(item: Item): void {
    const foundedItem = _.find(this.itemList, { id: item.id });

    if (_.isUndefined(foundedItem)) {
      this.messageSubject.next(CodeEnum.ITEM_NOT_FOUND);
      return;
    }

    foundedItem.availableCount--;
    foundedItem.countToBuy++;

    if (!_.find(this.cartList, { id: foundedItem.id })) {
      this.cartList.push(foundedItem);
    }

    this.messageSubject.next(CodeEnum.SUCCESS);
    this.cartSubject.next(this.cartSubject.value + 1);
  }
}
