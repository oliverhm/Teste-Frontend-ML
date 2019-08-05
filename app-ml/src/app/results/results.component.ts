import { ResultsService } from './results.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {
  products: any = [];

  constructor(
    private route: ActivatedRoute,
    private resultsService: ResultsService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(
        flatMap(params => this.resultsService.getItemsByQuery(params.search))
      )
      .subscribe((response: any) => this.products = response.items);
  }
}
