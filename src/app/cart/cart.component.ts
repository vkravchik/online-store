import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item, StoreService } from '../shared/services/store/store.service';
import { SubscriptionHelperService } from '../shared/services/subscription-helper/subscription-helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [SubscriptionHelperService]
})
export class CartComponent implements OnInit, OnDestroy {
  public cartList: Item[] = [];

  constructor(private storeService: StoreService, private subscriptionHelperService: SubscriptionHelperService) { }

  ngOnInit(): void {
    this.getCartList();
  }

  ngOnDestroy() {
    this.subscriptionHelperService.destroySubscriptions();
  }

  public cartIdentifier(index: number, item: Item): string {
    return item.id;
  }

  private getCartList(): void {
    const subscription = this.storeService.getCartList().subscribe((cartList: Item[]) => {
      this.cartList = cartList;
    });

    this.subscriptionHelperService.registerSubscription(subscription);
  }

}
