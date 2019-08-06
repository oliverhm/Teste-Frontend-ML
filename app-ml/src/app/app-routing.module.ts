import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'items', component: ResultsComponent },
  { path: 'items/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
