import { Component, Input, OnInit } from '@angular/core';
import { Item, StoreService } from '../services/store/store.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item = {
    id: '',
    name: '',
    imgUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    price: 0,
    availableCount: 0,
    purchaseQuantity: 0
  };

  @Input() isCartItem: boolean = false;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
  }

  onBuyItem(item: Item): void {
    this.storeService.addItemToCart(item)
  }
}
