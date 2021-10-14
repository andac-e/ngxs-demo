import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BookListComponent },
  { path: 'cart',  component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
