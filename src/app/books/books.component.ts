import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { concatMap, delay, from, map, mergeMap, of, Subscription, switchMap } from 'rxjs';

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

  // to create stream for switchmap and concat map
  private values = ['book 1', 'book 2', 'book 3']

  books$ = of(this.books);
  booksMap$ = this.books$.pipe(
    map((data) => data.map((book) => `name - ${book.name}`))
  )
  booksSubscription: Subscription;


  // switch map cancels all previous observable and just return the last one
  booksSwitchMap$ = from(this.values).pipe(
    switchMap((book) => of(book).pipe(delay(5000)))
  )

  // contact map doesn't cancel previous observable
  booksConcatMap$ = from(this.values).pipe(
    concatMap((book) => of(book).pipe(delay(2000)))
  )

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
