import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BookService } from 'src/app/services/book.service';
import { LoadBooks } from '../actions/book.actions';
import { Book } from '../models/book';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface BookStateModel {
  books: Book[];
  loading: boolean;
}

@State<BookStateModel>({
  name: 'bookState',
  defaults: {
    books: [],
    loading: true,
  },
})
@Injectable()
export class BookState {
  constructor(private bookService: BookService) {}

  @Selector()
  static getBooks(state: BookStateModel): Book[] {
    return state.books;
  }

  @Action(LoadBooks)
  loadData({ patchState }: StateContext<BookStateModel>) {
    return this.bookService.getBooks().pipe(
      tap((response) => {
        patchState({
          books: response,
          loading: false,
        });
      })
    );
  }
}
