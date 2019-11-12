import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ProductoService } from '../producto/producto.service';
import { Producto } from '../producto/producto';
import { Venta } from './venta';
import { ProductoVenta } from './producto-venta';
import { filter } from 'rxjs/operators';
import { VentaService } from './venta.service';
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
  ventas: Venta[];

  constructor(private productoService: ProductoService,
              private ventaService: VentaService,
              private renderer: Renderer2
    ) { }
    @ViewChild("txtCantidad", { static: false }) 
    private txtCantidad?: ElementRef<HTMLElement>;
    @ViewChild("cmbProducto", { static: false }) 
    private cmbProducto?: ElementRef<HTMLElement>;   

  ngOnInit() {  
    this.productos = [];
    this.limpiar();
    this.getProductos();
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe(resp => this.productos = resp);
  }

  deleteProdVenta(prodVenta: ProductoVenta): void {
    this.venta.productoVenta = this.venta.productoVenta.filter(pVenta => pVenta.producto.id != prodVenta.producto.id);    
  } 

  setVenta(): void {
    this.ventaService.setVenta(this.venta).subscribe(resp => this.venta = resp);
  }

  getValorTotal(): number {
    this.venta.valorTotal = 0;
    this.venta.productoVenta.forEach(function(prodVenta: ProductoVenta) {
      this.venta.valorTotal += (prodVenta.producto.precio*prodVenta.cantidad);
      console.log(prodVenta);
    }, this);
    return this.venta.valorTotal;
  }

  getSubTotal(): number {
    let subTotal: number = 0;
    this.venta.productoVenta.forEach(function(prodVenta: ProductoVenta) {
      subTotal += prodVenta.producto.precio;    
    }, this);
    return subTotal;
  }

  agregarProdVenta(): void {
    if(this.productoVenta.cantidad > 0) {
      this.productoVenta.producto = this.productoSeleccion;
      let prodVenta: ProductoVenta  = this.venta.productoVenta.find(pVenta => pVenta.producto.id == this.productoVenta.producto.id);
      console.log(prodVenta);
      console.log(this.productoVenta);
      if(prodVenta != null || prodVenta != undefined) {
        prodVenta.cantidad += this.productoVenta.cantidad;
      } else {
        this.venta.productoVenta.push(this.productoVenta);
      }     
      this.nuevoProducto();
    }
  }

  completarProd(): void {
    //console.log(this.productoSeleccion);
    this.txtCantidad.nativeElement.focus();
  }

  
  nuevoProducto(): void {
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
    };
    this.productoSeleccion = {
      id: 0, 
      categoria: {id: 0, nombre: ""},
      marca: {id: 0, nombre: ""},
      nombre: "",
      precio: 0.0,
      stock: 0
    };
  }

  limpiar(): void {
    this.nuevoProducto();
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
