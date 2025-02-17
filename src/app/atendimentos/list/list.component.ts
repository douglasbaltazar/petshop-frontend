import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { AtendimentosService } from '../../services/atendimentos/atendimentos.service';
import { Atendimento } from '../../models/atendimento.type';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, ButtonModule, ConfirmDialogModule, DatePipe, CurrencyPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ConfirmationService, AtendimentosService, MessageService]
})
export class ListComponent implements OnInit {
  items: Atendimento[] = [];

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
                      console.log("Excluido com Sucesso");
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
