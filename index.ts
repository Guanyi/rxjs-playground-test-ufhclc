import { interval, timer, from } from 'rxjs';
import { switchMap, takeUntil, first, tap } from 'rxjs/operators';

const MAX_DURATION = 60 * 1000; // 0.5 minutes in milliseconds
const INTERVAL = 5 * 1000; // 5 seconds in milliseconds

const stop$ = timer(MAX_DURATION);
const interval$ = interval(INTERVAL);
let counter = 0;

interval$
  .pipe(
    switchMap(() => from(myService())),
    tap((result) => console.log('Service function result:', result)),
    first((result) => result !== null),
    takeUntil(stop$)
  )
  .subscribe((result) => {
    console.log(result);
  });

function myService(): Promise<any> {
  const responseTime = Math.floor(Math.random() * 2000); // between 0 and 2 seconds

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 50% chance of returning a non-null result
      if (Math.random() < 0.3) {
        resolve({ data: 'Special result' });
      } else {
        resolve(null);
      }
    }, responseTime);
  });
}
