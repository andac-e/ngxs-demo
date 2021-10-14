import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadBooks } from 'src/app/store/actions/book.actions';
import { AddBookToCart } from 'src/app/store/actions/cart.actions';
import { Book } from 'src/app/store/models/book';
import { BookState } from 'src/app/store/states/book.state';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {

  @Select(BookState.getBooks) books$ : Observable<Book[]>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadBooks());
  }

  addToCart(book:Book) {
    this.store.dispatch(new AddBookToCart(book))
  }
}
