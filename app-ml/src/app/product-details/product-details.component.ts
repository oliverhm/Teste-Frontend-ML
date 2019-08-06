import { IProduct, IResponseProductDetails } from './../interface/items';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from './product-details.service';
import { flatMap } from 'rxjs/operators';

enum Condition {
  new = 'Nuevo',
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {
  public product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private productDetailsService: ProductDetailsService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        flatMap(params => this.productDetailsService.getItemById(params.id))
      )
      .subscribe((response: IResponseProductDetails) => this.product = response.item);
  }

  getPrice(price: { amount: number; decimals: number; }): string {
    return parseFloat(`${price.amount}.${price.decimals}`).toFixed(2);
  }

  getCondition(condition: string): string {
    return Condition[condition];
  }
}
