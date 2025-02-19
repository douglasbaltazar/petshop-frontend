import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { AtendimentosService } from '../../services/atendimentos/atendimentos.service';
import { Atendimento } from '../../models/atendimento.type';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { HasRoleDirective } from '../../directives/has-hole.directive';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, ButtonModule, ConfirmDialogModule, DatePipe, CurrencyPipe, ToastModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ConfirmationService, AtendimentosService, MessageService, HasRoleDirective, AuthService]
})
export class ListComponent implements OnInit {
  items: Atendimento[] = [];

  constructor(private router: Router, private atendimentoService: AtendimentosService, private confirmationService: ConfirmationService,
         private messageService: MessageService, private authService: AuthService
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
              console.log(item);
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
          
            editar(id: number) {
              this.router.navigate([`atendimentos/${id}`])
            }
}
