import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria/categoria.service';
import { Categoria } from '../categoria/categoria';
import { Producto } from './producto';
import { MarcaService } from '../marca/marca.service';
import { Marca } from '../marca/marca';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[];
  categorias: Categoria[];
  marcas: Marca[];
  productoSeleccion: Producto;

  constructor(private categoriaService: CategoriaService, 
              private marcaService: MarcaService, 
              private productoService: ProductoService) { }

  ngOnInit() {
    this.categorias = [];
    this.limpiar();
    this.getCategorias();
    this.getMarcas();
    this.getProductos();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(resp => this.categorias = resp);
  }

  getMarcas(): void {
    this.marcaService.getMarcas().subscribe(resp => this.marcas = resp);
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe(resp => this.productos = resp);
  }

  setProducto(): void {
    this.productoService.setProducto(this.productoSeleccion).subscribe(resp => {      
      this.productos.push(resp);  
      this.limpiar();
    });
  }

  updateProducto(producto: Producto): void {
    this.productoService.updateProducto(this.productoSeleccion).subscribe(resp => {     
      let productoFind = this.productos.find(mar => mar.id == this.productoSeleccion.id);
      productoFind.nombre = resp.nombre;   
      this.limpiar();
    });
  }

  deleteProducto(idProducto: number): void {
    this.productoService.deleteProducto(idProducto).subscribe(() => {
      let productosFilter = this.productos.filter(mar => mar.id != idProducto);
      this.productos = productosFilter;
    });
  }

  seleccionarProducto(event: any, producto: Producto): void {    
    this.productoSeleccion = {
      id: producto.id, 
      categoria: {id: producto.categoria.id, nombre: producto.categoria.nombre},
      marca: {id: producto.marca.id, nombre: producto.marca.nombre},
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock
    };
    event.preventDefault();
  }

  limpiar(): void {
    this.productoSeleccion = {
      id: 0, 
      categoria: {id: 0, nombre: ""},
      marca: {id: 0, nombre: ""},
      nombre: "",
      precio: 0.0,
      stock: 0
    };
  }
}
