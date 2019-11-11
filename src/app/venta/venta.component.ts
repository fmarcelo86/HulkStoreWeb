import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto/producto.service';
import { Producto } from '../producto/producto';
import { Venta } from './venta';
import { ProductoVenta } from './producto-venta';
declare var jQuery:any;
declare var $: any;

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  productos: Producto[];
  productoSeleccion: Producto;
  productoVenta: ProductoVenta;
  venta: Venta;

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.select2').select2();
      $('.select2bs4').select2({
        theme: 'bootstrap4'
      });      
    });
    this.productos = [];
    this.limpiar();
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe(resp => this.productos = resp);
  }

  deleteProdVenta(): void {
   
  } 

  agregarProdVenta(): void {
    this.venta.productoVenta.push(this.productoVenta);
  }

  completarProd(): void {
    console.log(this.productoSeleccion);
    this.venta.valorTotal = 2222;
    //this.productoVenta.valor
    //this.productoVenta.
  }

  limpiar(): void {
    this.productoVenta = {
      id: 0,
      producto: {
        id: 0, 
        categoria: {id: 0, nombre: ""},
        marca: {id: 0, nombre: ""},
        nombre: "",
        precio: 0.0,
        stock: 0
      },
      cantidad: 0
    }
    this.productoSeleccion = {
      id: 0, 
      categoria: {id: 0, nombre: ""},
      marca: {id: 0, nombre: ""},
      nombre: "",
      precio: 0.0,
      stock: 0
    }

    this.venta = {
      id: 0,
      cliente: {},
      usuario: {},
      productoVenta: [],
      valorTotal: 0,
      fechaVenta: ""
    };
  }

}
