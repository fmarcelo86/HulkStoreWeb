import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ProductoService } from '../producto/producto.service';
import { Producto } from '../producto/producto';
import { Venta } from './venta';
import { ProductoVenta } from './producto-venta';
import { filter } from 'rxjs/operators';
import { VentaService } from './venta.service';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from '../cliente/cliente';
declare var jQuery:any;
declare var $: any;

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  //cliente: Cliente;
  productos: Producto[];
  productoSeleccion: Producto;
  productoVenta: ProductoVenta;
  venta: Venta;
  ventas: Venta[];

  constructor(private productoService: ProductoService,
              private ventaService: VentaService,
              private clienteService: ClienteService,
              private renderer: Renderer2
    ) { }
    @ViewChild("txtCantidad", { static: false }) 
    private txtCantidad?: ElementRef<HTMLElement>;
    @ViewChild("altStock", { static: false }) 
    private altStock?: ElementRef<HTMLElement>;
    
  ngOnInit() {   
    this.productos = [];
    this.ventas = [];
    this.getVentas();
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

  getVentas(): void {
    this.ventaService.getVentas().subscribe(resp => this.ventas = resp);
  }

  getClienteByCedula(): void {
    this.clienteService.getClienteByCedula(this.venta.cliente.cedula).subscribe(resp => this.venta.cliente = resp);
  }

  setVenta(): void {
    this.ventaService.setVenta(this.venta).subscribe(resp => {
      this.ventas.push(resp);
      this.limpiar();
    });
  }

  getValorTotal(): number {
    this.venta.valorTotal = 0;
    this.venta.productoVenta.forEach(function(prodVenta: ProductoVenta) {
      this.venta.valorTotal += (prodVenta.producto.precio*prodVenta.cantidad);  
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
      if(this.productoVenta.cantidad > this.productoSeleccion.stock) { 
        this.renderer.addClass(this.altStock.nativeElement, "show");        
        return;
      }
      this.productoVenta.producto = this.productoSeleccion;
      let prodVenta: ProductoVenta  = this.venta.productoVenta.find(pVenta => pVenta.producto.id == this.productoVenta.producto.id);     
      if(prodVenta != null || prodVenta != undefined) {
        prodVenta.cantidad += this.productoVenta.cantidad;
      } else {
        this.venta.productoVenta.push(this.productoVenta);
      }     
      this.nuevoProducto();
    }
  }

  completarProd(): void {
    this.txtCantidad.nativeElement.focus();
  }

  
  nuevoProducto(): void {   
    this.productoVenta = {
      id: null,
      producto: {
        id: null, 
        categoria: {id: null, nombre: ""},
        marca: {id: null, nombre: ""},
        nombre: "",
        precio: 0.0,
        stock: 0
      },
      cantidad: 0
    };
    this.productoSeleccion = {
      id: null, 
      categoria: {id: null, nombre: ""},
      marca: {id: null, nombre: ""},
      nombre: "",
      precio: 0.0,
      stock: 0
    };
  }

  limpiar(): void {
    this.nuevoProducto();
    this.venta = {
      id: null,
      cliente: {
        id: null,
        cedula: null,
        nombre: null,
        celular: null,
        email: null,
        direccion: null
      },
      usuario: null,
      productoVenta: [],
      valorTotal: 0,
      fechaVenta: null
    };
  }
}
