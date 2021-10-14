import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { AddBookToCart, LoadCartItems, RemoveBookFromCart } from 'src/app/store/actions/cart.actions';
import { Book } from 'src/app/store/models/book';
import { CartItem } from 'src/app/store/models/cart-item';
import { CartState } from 'src/app/store/states/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Select(CartState.cartItems) cart$: Observable<CartItem[]>

  constructor(private store:Store) { }

  ngOnInit(): void {
    // this.bookService.getBooks().subscribe((data)=>{
    //   let books = data;
    //   for(let book of books) {
    //     this.store.dispatch(new AddBookToCart(book))
    //   }
    // })
    this.store.dispatch(new LoadCartItems());
  }

  removeFromCart(book:Book) {
    this.store.dispatch(new RemoveBookFromCart(book))
  }

}
