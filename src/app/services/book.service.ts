import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../store/models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiUrl: string = 'http://localhost:3000/books';
  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.apiUrl);
  }
}
