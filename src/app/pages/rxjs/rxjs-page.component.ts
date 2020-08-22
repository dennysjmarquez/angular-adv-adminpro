import {Component, OnDestroy} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-page',
  templateUrl: './rxjs-page.component.html',
  styles: [
  ]
})
export class RxjsPageComponent implements OnDestroy{

  private _intervalSubs: Subscription;

  constructor() {

    /*
    this.returnObservable().pipe(

      // Retry() es para reintentar ejecutar el Observable si este falla
      // y lleva como valor el numero de veces que lo reintentara luego de
      // haberse presentado algún error en el, si no se especifica
      // algún valor lo intentara al infinito
      retry(1)

    ).subscribe(
      (valor)=>console.log('[ob$.subscribe]valor', valor),
      (error) =>console.warn('ob$ Error', error),
      ()=>console.log('ob$ Terminado'));
*/

    this._intervalSubs =this.returnInterval().pipe(

      // Especifica cuantas veces se va a ejecutar el Observable
      take(10),

      // Sirve para filtrar los valores y en este caso solo se muestran
      // los números que no son impares
      filter(value => value % 2 === 0),

      // Este operador recibe la información y la muta
      map(value =>{
        return 'Hola mundo ' + (value + 1)
      }),


    ).subscribe(
      (valor)=>console.log('[returnInterval]valor', valor),
      (error) =>console.warn('returnInterval Error', error),
      ()=>console.log('returnInterval Terminado'));

  }

  ngOnDestroy(): void {

    this._intervalSubs.unsubscribe();

  }

  returnInterval(): Observable<number>{

    return interval(100);

  }

  returnObservable(): Observable<number>{

    let i = 0;

    const ob$ = new Observable<number>(observer =>{

      const interval = setInterval(()=>{

        observer.next(i);

        if(i === 4) {

          clearInterval(interval);
          observer.complete();

        }

        if(i === 2) {

          i = 0;

          observer.error('i llego al valor 2')

        }

        ++i;

      }, 1000);

    });

    return ob$;

  }

}
