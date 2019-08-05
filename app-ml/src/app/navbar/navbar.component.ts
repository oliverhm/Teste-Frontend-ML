import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public search = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit() {}

  searchProduct(): void {
    this.router.navigate(['/items'], { queryParams: { search: this.search.value } });
  }
}
