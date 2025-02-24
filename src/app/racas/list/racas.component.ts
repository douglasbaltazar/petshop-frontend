import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RacaService } from '../../services/raca/raca.service';
import { Raca } from '../../models/raca.type';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Coluna } from '../../models/coluna.type';
import { TabelaPadraoComponent } from "../../tabela-padrao/tabela-padrao.component";
import { HasRoleDirective } from '../../directives/has-hole.directive';


@Component({
  selector: 'app-racas',
  standalone: true,
  imports: [TableModule, ButtonModule, ConfirmDialogModule, ToastModule, TabelaPadraoComponent, HasRoleDirective],
  templateUrl: './racas.component.html',
  styleUrl: './racas.component.scss',
  providers: [ConfirmationService, RacaService, MessageService]
})
export class RacasComponent implements OnInit {
  items: Raca[] = [];

  colunas: Coluna[] = [{ field: 'id', header: 'ID', width: '20%', type: 'number' },
      { field: 'descricao', header: 'Descrição', width: '20%', type: 'text' }
    ]

  constructor(private router: Router, private racaService: RacaService, private confirmationService: ConfirmationService,
     private messageService: MessageService
  ) {

  }
  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.racaService.listar().subscribe((racas) => {
      if(racas) {
        this.items = racas;
      }
    })
  }

  deleteItem(item: Raca) {
    console.log(item);
    this.confirmationService.confirm({
      message: `Você deseja cancelar realmente a raça <strong>${item.descricao}</strong>?`,
      header: "Confirmação",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptButtonStyleClass:"p-button-text p-button-text",
      rejectButtonStyleClass:"p-button-danger p-button-text",
      accept: () => {
        if(item.id) {
          this.racaService.apagarPorId(item.id).subscribe((item) => {
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
    this.router.navigate(['racas/novo']);
  }

  editar(raca: Raca) {
    this.router.navigate([`racas/${raca.id}`])
  }
}