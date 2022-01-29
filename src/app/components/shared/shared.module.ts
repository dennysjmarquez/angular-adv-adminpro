import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

// Components
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {PaginationComponent} from './pagination/pagination.component';
import {PipesModule} from '../../pipes/pipes.module';


@NgModule({
	declarations: [BreadcrumbsComponent, SidebarComponent, HeaderComponent, PaginationComponent],
	imports: [CommonModule, RouterModule, FormsModule, PipesModule],
	exports: [BreadcrumbsComponent, SidebarComponent, HeaderComponent, PaginationComponent],
})
export class SharedModule {}
