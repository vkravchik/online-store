import { Component, OnDestroy, OnInit } from '@angular/core';
import { CodeEnum } from '../shared/enums/code.enum';
import { Item, StoreService } from '../shared/services/store/store.service';
import { SubscriptionHelperService } from '../shared/services/subscription-helper/subscription-helper.service';
import { ToastService } from '../shared/services/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SubscriptionHelperService]
})
export class HomeComponent implements OnInit, OnDestroy {
  public items: Item[] = [];

  constructor(
    private storeService: StoreService,
    private toastService: ToastService,
    private subscriptionHelperService: SubscriptionHelperService
  ) {

  }

  ngOnInit(): void {
    this.getItemList();
    this.onToastHandler();
  }

  ngOnDestroy(): void {
    this.subscriptionHelperService.destroySubscriptions();
  }

  public itemsIdentifier(index: number, item: Item): string {
    return item.id;
  }

  private getItemList(): void {
    this.storeService.getItemList().subscribe((itemList: Item[]) => {
      this.items = itemList;
    });
  }

  private onToastHandler(): void {
    const subscription = this.storeService.messageSubject.subscribe((msgType: CodeEnum) => {
      this.toastService.showToast(msgType);
    });

    this.subscriptionHelperService.registerSubscription(subscription);
  }

}
