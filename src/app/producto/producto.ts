import { Categoria } from '../categoria/categoria';
import { Marca } from '../marca/marca';

export class Producto {
    id: number;
    categoria: Categoria;
    marca: Marca;
    nombre: string;
    precio: number;
    stock: number;
}
