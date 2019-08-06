import { IProduct } from './../interface/items';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProductDetails(productId: string): void {
    this.router.navigate([`items/${productId}`]);
  }

  getPrice(price: { amount: number; decimals: number; }): string {
    return parseFloat(`${price.amount}.${price.decimals}`).toFixed(2);
  }
}
