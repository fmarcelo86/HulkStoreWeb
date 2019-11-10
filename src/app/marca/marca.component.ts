import { Component, OnInit } from '@angular/core';
import { MarcaService } from './marca.service';
import { Marca } from './marca';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {
  marcas: Marca[];
  marcaSeleccion: Marca;

  constructor(private marcaService: MarcaService) { }

  ngOnInit() {
    this.marcas = [];
    this.limpiar();
    this.getMarcas();
  }

  getMarcas(): void {
    this.marcaService.getMarcas().subscribe(resp => this.marcas = resp);
  }

  setMarca(): void {
    this.marcaService.setMarca(this.marcaSeleccion).subscribe(resp => {      
      this.marcas.push(resp);  
      this.limpiar();
    });
  }

  updateMarca(marca: Marca): void {
    this.marcaService.updateMarca(this.marcaSeleccion).subscribe(resp => {     
      let marcaFind = this.marcas.find(mar => mar.id == this.marcaSeleccion.id);
      marcaFind.nombre = resp.nombre;   
      this.limpiar();
    });
  }

  deleteMarca(idMarca: number): void {
    this.marcaService.deleteMarca(idMarca).subscribe(() => {
      let marcasFilter = this.marcas.filter(mar => mar.id != idMarca);
      this.marcas = marcasFilter;
    });
  }

  limpiar(): void {
    this.marcaSeleccion = {id: 0, nombre: ""};
  }

  seleccionarMarca(event: any, marca: Marca): void {
    this.marcaSeleccion = {id: marca.id, nombre: marca.nombre};
    event.preventDefault();
  }
}