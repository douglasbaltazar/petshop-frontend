import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RacaService } from '../../services/raca/raca.service';
import { Raca } from '../../models/raca.type';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-racas',
  standalone: true,
  imports: [TableModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './racas.component.html',
  styleUrl: './racas.component.scss',
  providers: [ConfirmationService, RacaService, MessageService]
})
export class RacasComponent implements OnInit {
  items: Raca[] = [];

  constructor(private router: Router, private racaService: RacaService, private confirmationService: ConfirmationService,
     private messageService: MessageService
  ) {

  }
  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.racaService.listar().subscribe((racas) => {
      this.items = racas;
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
    this.router.navigate(['racas/novo']);
  }

  editar(id: number) {
    this.router.navigate([`racas/${id}`])
  }
}