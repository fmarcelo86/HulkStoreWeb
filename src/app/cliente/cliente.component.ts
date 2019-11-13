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
    this.limpiar();
  }

  getClienteByCedula(cedula: string): void {
    this.clienteService.getClienteByCedula(cedula).subscribe(resp => this.clienteSeleccion = resp);
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
