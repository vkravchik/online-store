import { Component, OnInit } from '@angular/core';
import { StoreService } from './shared/services/store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public badge: number = 0;

  public readonly homeLink = '/home';
  public readonly cartLink = '/cart';

  constructor(private storeService: StoreService) {
    //
  }

  ngOnInit(): void {
    this.onCartHandler()
  }

  public onCartHandler(): void {
    this.storeService.cartSubject.subscribe((newBadge: number) => {
      this.badge = newBadge;
    })
  }

}
