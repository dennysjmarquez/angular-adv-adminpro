import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutersModule } from './routers/app-routers.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './pages/auth/auth.module';

// Components
import { AppComponent } from './app.component';
import { ErrorPage404Component } from './statusCodesPages/404/errorpage404.component';


@NgModule({
	imports: [BrowserModule, AppRoutersModule, PagesModule, AuthModule],
	declarations: [AppComponent, ErrorPage404Component],
	providers: [],
	exports: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
