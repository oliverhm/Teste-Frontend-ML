import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResultsComponent } from './results/results.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultsService } from './results/results.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ResultsComponent,
    ProductComponent,
    ProductDetailsComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ResultsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
