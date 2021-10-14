import { Book } from "../models/book";

export class AddBookToCart {
    static type = '[Books] Add To Cart'
    constructor(public readonly payload: Book) {}
}

export class RemoveBookFromCart {
    static type = '[Books] Remove From Cart'
    constructor(public readonly payload: Book) {}
}

export class LoadCartItems {
    static type = '[Cart] Load'
}

export type CartActions = AddBookToCart | RemoveBookFromCart | LoadCartItems