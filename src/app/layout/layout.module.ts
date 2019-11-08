import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, MenuLeftComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MenuLeftComponent
  ]
})
export class LayoutModule { }
