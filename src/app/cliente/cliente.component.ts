import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[];
  clienteSeleccion: Cliente;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clientes = [];
    this.getClientes();
    this.limpiar();
  }

  getClienteByCedula(cedula: string): void {
    this.clienteService.getClienteByCedula(cedula).subscribe(resp => this.clienteSeleccion = resp);
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe(resp => this.clientes = resp);
  }

  setCliente(): void {
    this.clienteService.setCliente(this.clienteSeleccion).subscribe(resp => {
        this.clientes.push(resp);  
        this.limpiar();
    });
  }

  updateCliente(cliente: Cliente): void {
    this.clienteService.updateCliente(this.clienteSeleccion).subscribe(resp => {     
      let clienteFind = this.clientes.find(mar => mar.id == this.clienteSeleccion.id);
      clienteFind.nombre = resp.nombre;
      this.limpiar();
    });
  }

  deleteCliente(idCliente: number): void {
    this.clienteService.deleteCliente(idCliente).subscribe(() => {
      let clientesFilter = this.clientes.filter(mar => mar.id != idCliente);
      this.clientes = clientesFilter;
    });
  }

  seleccionarCliente(event: any, cliente: Cliente): void {
    this.clienteSeleccion = {
      id: cliente.id, 
      cedula: cliente.cedula,
      nombre: cliente.nombre, 
      celular: cliente.celular,
      email: cliente.email,
      direccion: cliente.direccion
    };
    event.preventDefault();
  }

  limpiar(): void {
    this.clienteSeleccion = {
      id: null,
      cedula: null,
      nombre: null,
      celular: null,
      email: null,
      direccion: null
    };
  }
}
