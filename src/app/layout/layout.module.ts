import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, MenuLeftComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MenuLeftComponent
  ]
})
export class LayoutModule { }
