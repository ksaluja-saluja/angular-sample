import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit, OnDestroy {
  private books = [
    { id: 1, name: 'book1', price: 100 },
    { id: 2, name: 'book2', price: 150 },
    { id: 3, name: 'book3', price: 80 },
  ]

  books$ = of(this.books);
  booksMap$ = this.books$.pipe(
    map((data) => data.map((book) => `name - ${book.name}`))
  )
  booksSubscription: Subscription;

  ngOnInit(): void {
    // Another way to subscribe is Async Pipe in html
    this.booksSubscription = this.books$.subscribe((data) => {
      console.log('DATA IS', data)
    })
  }

  ngOnDestroy(): void {
    console.log('Destroying')
    this.booksSubscription.unsubscribe();
  }

}
