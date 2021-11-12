import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionHelperService {
  private subscriptions: Subscription[] = []

  constructor() { }

  public registerSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  public destroySubscriptions(): void {
    this.subscriptions.forEach(el => el.unsubscribe());

    if (_.some(this.subscriptions, { closed: false, isStopped: false })) {
      console.warn(`Something went wrong during unsubscribing. ${this.subscriptions}`)
    }
  }
}
