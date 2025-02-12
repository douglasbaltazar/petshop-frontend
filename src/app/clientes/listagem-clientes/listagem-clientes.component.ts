import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Cliente } from '../../models/cliente.type';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.type';
import { TagModule } from 'primeng/tag'

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [TableModule, ButtonModule, ConfirmDialogModule, TagModule],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.scss',
  providers: [ConfirmationService, ClienteService, MessageService]
})
export class ListagemClientesComponent implements OnInit {
items: Usuario[] = [];
expandedRows = {};


  constructor(private router: Router, private clienteService: UsuarioService, private confirmationService: ConfirmationService,
     private messageService: MessageService
  ) {

  }

  onRowExpand(event: TableRowExpandEvent) {
    this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
  }
  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.clienteService.listar().subscribe((clientes) => {
      if(clientes) {
        this.items = clientes;
      }
    })
  }

  deleteItem(item: Usuario) {
    this.confirmationService.confirm({
      message: `Você deseja cancelar realmente o cliente <strong>${item.nome}</strong>?`,
      header: "Confirmação",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptButtonStyleClass:"p-button-text p-button-text",
      rejectButtonStyleClass:"p-button-danger p-button-text",
      accept: () => {
        if(item.id) {
          this.clienteService.apagarPorId(item.id).subscribe((item) => {
            console.log("Excluido com Sucesso");
          })
        }
      },
      reject: () => {
      }
    })
  }

  cadastrar() {
    this.router.navigate(['cliente/novo']);
  }

  editar(id: number) {
    this.router.navigate([`cliente/${id}`])
  }
}
