import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { AtendimentosService } from '../../services/atendimentos/atendimentos.service';
import { Atendimento } from '../../models/atendimento.type';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { HasRoleDirective } from '../../directives/has-hole.directive';
import { AuthService } from '../../services/auth/auth.service';
import { TabelaPadraoComponent } from "../../tabela-padrao/tabela-padrao.component";
import { Coluna } from '../../models/coluna.type';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, ButtonModule, ConfirmDialogModule, ToastModule, HasRoleDirective, TabelaPadraoComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ConfirmationService, AtendimentosService, MessageService, AuthService]
})
export class ListComponent implements OnInit {
  items: Atendimento[] = [];
  colunas: Coluna[] = [{ field: 'id', header: 'ID', width: '10%', type: 'number' },
    { field: 'descricao', header: 'Descrição', width: '20%', type: 'number' },
    { field: 'valor', header: 'Valor', width: '10%', type: 'money' },
    { field: 'data', header: 'Data Atendimento', width: '20%', type: 'date' },
    { field: 'pet.nome', header: 'Pet', width: '20%', type: 'text' },
    { field: 'pet.cliente.usuario.nome', header: 'Tutor', width: '20%', type: 'text' }]

  constructor(private router: Router, private atendimentoService: AtendimentosService, private confirmationService: ConfirmationService,
         private messageService: MessageService
      ) {
    
      }

      ngOnInit() {
        this.carregarDados();
      }
    
      carregarDados() {
        this.atendimentoService.listar().subscribe((atendimentos) => {
          if(atendimentos) {
            this.items = atendimentos;
          }
        })
      }


      deleteItem(item: Atendimento) {
        this.confirmationService.confirm({
          message: `Você deseja cancelar realmente o atendimento <strong>${item.descricao}</strong>?`,
          header: "Confirmação",
          acceptLabel: "Sim",
          rejectLabel: "Não",
          acceptButtonStyleClass:"p-button-text p-button-text",
          rejectButtonStyleClass:"p-button-danger p-button-text",
            accept: () => {
              if(item.id) {
                this.atendimentoService.apagarPorId(item.id).subscribe((item) => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro excluido com sucesso' });
                this.carregarDados();
              }, (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro' });
                this.carregarDados();
              })
              }
            },
              reject: () => {
                console.log('ok')
              }
            })
          }
      cadastrar() {
        this.router.navigate(['atendimentos/novo']);
      }
      editar(atendimento: Atendimento) {
        this.router.navigate([`atendimentos/${atendimento.id}`])
      }
}
