import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[];
  categoriaSeleccion: Categoria;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categorias = [];
    this.limpiar();
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(resp => this.categorias = resp);
  }

  setCategoria(): void {
    this.categoriaService.setCategoria(this.categoriaSeleccion).subscribe(resp => {      
      this.categorias.push(resp);  
      this.limpiar();
    });
  }

  updateCategoria(categoria: Categoria): void {
    this.categoriaService.updateCategoria(this.categoriaSeleccion).subscribe(resp => {     
      let categoriaFind = this.categorias.find(mar => mar.id == this.categoriaSeleccion.id);
      categoriaFind.nombre = resp.nombre;   
      this.limpiar();
    });
  }

  deleteCategoria(idCategoria: number): void {
    this.categoriaService.deleteCategoria(idCategoria).subscribe(() => {
      let categoriasFilter = this.categorias.filter(mar => mar.id != idCategoria);
      this.categorias = categoriasFilter;
    });
  }

  limpiar(): void {
    this.categoriaSeleccion = {id: 0, nombre: ""};
  }

  seleccionarCategoria(event: any, categoria: Categoria): void {
    this.categoriaSeleccion = {id: categoria.id, nombre: categoria.nombre};
    event.preventDefault();
  }
}