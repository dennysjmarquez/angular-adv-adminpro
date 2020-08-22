import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise-page',
  templateUrl: './promise-page.component.html',
  styles: [
  ]
})
export class PromisePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const promesa1 = new Promise((resolve, reject)=>{

      if(false){
        resolve('Promesa 1');
      }else{
        reject('Promesa 1');
      }

    });

    promesa1.then((data)=>{
      console.log(`La ${data} termino`);
    }).catch((err)=>{
      console.log(`Algo salio mal en la ${err}`);
    });

    this.getUsers().then(users=>console.log(users))

    console.log('FIN del ngOnInit');

  }

  getUsers(){

    return new Promise((resolve, reject) => {

      fetch('https://reqres.in/api/users')
        .then(response => response.json())
        .then((body)=>resolve(body.data))

    })

  }

}
