# Proyecto (angular-adv-adminpro)
Angular 10, MEAN, Google auth, JWT, Lazyload, upload de archivos, Guards, Pipes, Zona admin, dashboard y mucho más.

<img src="https://miro.medium.com/max/1400/1*6HtFq392SoRkZOt_iOXz9A.png"/>

Puede ver una **demo** alojada en **Heroku** [https://adminpro-system-hospitals.herokuapp.com/](https://adminpro-system-hospitals.herokuapp.com/)

**Más información sobre este cliente lo encuentra aquí :**
[https://dennysjmarquez.medium.com/angular-10-mean-google-auth-jwt-lazyload-upload-de-archivos-guards-pipes-zona-admin-bfa2e5ef9074](https://dennysjmarquez.medium.com/angular-10-mean-google-auth-jwt-lazyload-upload-de-archivos-guards-pipes-zona-admin-bfa2e5ef9074)

# Sesión 1 — Front-End


## Como hacerlo funcionar

Instale las dependencias del proyecto:

```bash
npm install
```

Agregue las siguientes configuraciones en **environment.defaults.ts** archivo ubicado en:
environments/

```bash
export const defaultEnvironment = {
   ROLE_ADMIN: 'ADMIN_ROLE',
   GOOGLE_ID: ''
};
```

**GOOGLE_ID** Es el ID generado en la App OAuth2 de Google, puedes conseguir uno aquí
Es el ID generado en la App OAuth2 de Google, puedes conseguir uno aquí
[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**El servidor que retorna la data para este proyecto lo puedes encontrar aquí**
[https://github.com/dennysjmarquez/angular-adv-adminpro-backend](https://github.com/dennysjmarquez/angular-adv-adminpro-backend)

Compilas para producción este proyecto y lo agregas en la carpeta **public** del servidor, pero si solo necesitas que te sirva la data no es necesario que hagas esto, solo echa andar el servidor con su debida configuración.

<br/>

**Ya con las configuraciones listas:**


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
