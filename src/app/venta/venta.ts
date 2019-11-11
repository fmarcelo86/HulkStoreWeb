import { Cliente } from '../cliente/cliente';
import { Usuario } from '../usuario/usuario';
import { ProductoVenta } from './producto-venta';

export class Venta {
    id: number;
    cliente: Cliente;
    usuario: Usuario;
    productoVenta: ProductoVenta[];
    valorTotal: number;
    fechaVenta: string;
}
