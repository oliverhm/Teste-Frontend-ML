import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from './product-details.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {
  public product: any;

  constructor(
    private route: ActivatedRoute,
    private productDetailsService: ProductDetailsService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        flatMap(params => this.productDetailsService.getItemById(params.id))
      )
      .subscribe((response: any) => this.product = response.item);
  }

  getPrice(price: { amount: number; decimals: number; }): string {
    return parseFloat(`${price.amount}.${price.decimals}`).toFixed(2);
  }
}
