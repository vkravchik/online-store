import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CodeEnum } from '../../enums/code.enum';

export interface Item {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  availableCount: number;
  purchaseQuantity: number;
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
      name: 'iPhone 13',
      imgUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1617135051000',
      price: 1500,
      availableCount: 3,
      purchaseQuantity: 0
    },
    {
      id: '2',
      name: 'Airpods Pro',
      imgUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MWP22?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1591634795000',
      price: 300,
      availableCount: 3,
      purchaseQuantity: 0
    },
    {
      id: '3',
      name: 'MacBook Pro',
      imgUrl: 'https://ilounge.ua/files/products/apple-macbook-pro-14-m1-pro-01_2.1000x.jpg',
      price: 2500,
      availableCount: 5,
      purchaseQuantity: 0
    },
    {
      id: '4',
      name: 'iPad Pro',
      imgUrl: 'https://hotline.ua/img/tx/238/2384029215.jpg',
      price: 1500,
      availableCount: 0,
      purchaseQuantity: 0
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
    foundedItem.purchaseQuantity++;

    if (!_.find(this.cartList, { id: foundedItem.id })) {
      this.cartList.push(foundedItem);
    }

    this.messageSubject.next(CodeEnum.SUCCESS);
    this.cartSubject.next(this.cartSubject.value + 1);
  }

  removeItemFromCart(item: Item): void {
    const foundedItem = _.find(this.itemList, { id: item.id });

    if (_.isUndefined(foundedItem)) {
      this.messageSubject.next(CodeEnum.ITEM_NOT_FOUND);
      return;
    }

    foundedItem.purchaseQuantity--;
    foundedItem.availableCount++;

    if (foundedItem.purchaseQuantity === 0) {
      _.remove(this.cartList, { id: foundedItem.id });
    }

    this.messageSubject.next(CodeEnum.SUCCESS);
    this.cartSubject.next(this.cartSubject.value - 1);
  }
}
