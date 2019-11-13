import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarcaComponent } from './marca/marca.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  { path:'' , component: VentaComponent },
  { path:'marca' , component: MarcaComponent },
  { path:'categoria' , component: CategoriaComponent },
  { path:'cliente' , component: ClienteComponent },
  { path:'producto' , component: ProductoComponent },
  { path:'venta' , component: VentaComponent },
  { path:'cliente' , component: VentaComponent },
  { path:'**' , redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
