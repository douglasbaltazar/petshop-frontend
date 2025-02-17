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
import { PanelModule } from 'primeng/panel';
import { EnderecosService } from '../../services/cliente/enderecos.service';
import { ContatosService } from '../../services/cliente/contatos.service';
import { Endereco } from '../../models/endereco.type';
import { Contato } from '../../models/contato.type';
import { EditEnderecoComponent } from "../modals/edit-endereco/edit-endereco.component";
import { EditContatoComponent } from "../modals/edit-contato/edit-contato.component";

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [TableModule, ButtonModule, ConfirmDialogModule, TagModule, PanelModule, EditEnderecoComponent, EditContatoComponent],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.scss',
  providers: [ConfirmationService, ClienteService, MessageService]
})
export class ListagemClientesComponent implements OnInit {
items: Cliente[] = [];
editEndereco: boolean = false;
editContato: boolean = false;
endereco?: Endereco;
idCliente: number = 0;

expandedRows = {};


  constructor(private router: Router, private clienteService: ClienteService, private confirmationService: ConfirmationService,
     private messageService: MessageService, private enderecoService: EnderecosService, private contatosService: ContatosService
  ) {

  }

  ngOnInit() {
    this.carregarDados();
  }

  editarEndereco(cliente: Cliente) {
    this.idCliente = cliente.id!;
    this.editEndereco = true;
  }

  onFecharDialogEndereco() {
    this.editEndereco = false;
  }

  editarContato(cliente: Cliente) {
    this.idCliente = cliente.id!;
    this.editContato = true;
  }

  onFecharDialogContato() {
    this.editContato = false;
  }

  carregarDados() {
    this.clienteService.listar().subscribe((clientes) => {
      if(clientes) {
        this.items = clientes;
      }
    })
  }

  deleteItem(item: Cliente) {
    this.confirmationService.confirm({
      message: `Você deseja cancelar realmente o cliente <strong>${item.usuario?.nome}</strong>?`,
      header: "Confirmação",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptButtonStyleClass:"p-button-text p-button-text",
      rejectButtonStyleClass:"p-button-danger p-button-text",
      accept: () => {
        if(item.id) {
          this.clienteService.apagarPorId(item.id).subscribe((item) => {
            console.log("Excluido com Sucesso");
            this.carregarDados();
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

  cadastrarEndereco(endereco: Endereco) {
    this.enderecoService.gravarEndereco(endereco, this.idCliente).subscribe((end) => {
      console.log('Salvo', end);
      this.editEndereco = false;
      this.carregarDados();
    })
  }

  deleteEndereco(endereco: Endereco) {
    this.confirmationService.confirm({
      message: `Você deseja cancelar realmente o endereço <strong>${endereco.id}</strong>?`,
      header: "Confirmação",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptButtonStyleClass:"p-button-text p-button-text",
      rejectButtonStyleClass:"p-button-danger p-button-text",
      accept: () => {
        if(endereco.id) {
          this.enderecoService.apagarPorId(endereco.id).subscribe((item) => {
            console.log("Excluido com Sucesso");
            this.carregarDados();
          })
        }
      },
      reject: () => {
      }
    })
  }

  cadastrarContato(contato: Contato) {
    this.contatosService.gravarContato(contato, this.idCliente).subscribe((end) => {
      console.log('Salvo', end);
      this.editContato = false;
      this.carregarDados();
    })
  }

  deleteContato(endereco: Endereco) {
    this.confirmationService.confirm({
      message: `Você deseja cancelar realmente o contato <strong>${endereco.id}</strong>?`,
      header: "Confirmação",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptButtonStyleClass:"p-button-text p-button-text",
      rejectButtonStyleClass:"p-button-danger p-button-text",
      accept: () => {
        if(endereco.id) {
          this.contatosService.apagarPorId(endereco.id).subscribe((item) => {
            console.log("Excluido com Sucesso");
            this.carregarDados();
          })
        }
      },
      reject: () => {
      }
    })
  }

}
