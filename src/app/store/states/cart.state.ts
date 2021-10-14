import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { CartItem } from '../models/cart-item';
import { BookState, BookStateModel } from './book.state';
import * as cartActions from '../actions/cart.actions';

export interface CartStateModel {
  cartItems: CartItem[];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    cartItems: [],
  },
})

@Injectable()
export class CartState {
  constructor(private store: Store) {}

  @Selector([BookState])
  static cartItems(state: CartStateModel, bookState: BookStateModel):CartItem[] {
    const { cartItems } = state;
    const books = bookState.books;
    return joinItems(cartItems, books);
  }

  @Action(cartActions.LoadCartItems)
  loadCartItems({ getState }) {
    const { cartItems } = getState();
    const books = this.store.selectSnapshot(BookState.getBooks);
    return joinItems(cartItems, books);
  }

  @Action(cartActions.AddBookToCart)
  addBookToCart(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: cartActions.AddBookToCart
  ) {
    const state = [...getState().cartItems];
    let findIndex = state.findIndex((c) => payload.id === c.book.id);

    if (findIndex > -1) {
      return patchState({
        cartItems: state.map((item, index) => {
          if (index !== findIndex) {
            return item;
          }
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }),
      });
    } else {
      let item: CartItem = { book: payload, quantity: 1 };
      
      return patchState({
        cartItems: [...getState().cartItems, item],
      });
    }
  }

  @Action(cartActions.RemoveBookFromCart)
  removeFromCart(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: cartActions.RemoveBookFromCart
  ) {
    const state = [...getState().cartItems];
    const filteredCartItems = state.filter(
      (c) => c.book.id !== payload.id
    );

    patchState({
      ...state,
      cartItems: filteredCartItems,
    });
  }
}

function joinItems(cartItems, books):CartItem[] {
  return cartItems.map((cartItem) => {
    const book = books.find((b) => b.id === cartItem.book.id);
    return {
      ...cartItem,
      ...book,
      total: cartItem.quantity * book.price,
    };
  });
}
