import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet/pet.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Pet } from '../../models/pet.type';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, ButtonModule, ConfirmDialogModule, DatePipe, ToastModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ConfirmationService, PetService, MessageService]
})
export class ListComponent implements OnInit {
  items: Pet[] = [];

  constructor(private router: Router, private petService: PetService, private confirmationService: ConfirmationService,
       private messageService: MessageService
    ) {
  
    }
    ngOnInit() {
      this.carregarDados();
    }
  
    carregarDados() {
      this.petService.listar().subscribe((pets) => {
        if(pets) {
          this.items = pets;
        }
      })
    }

    deleteItem(item: Pet) {
        console.log(item);
        this.confirmationService.confirm({
          message: `Você deseja cancelar realmente o pet <strong>${item.nome}</strong>?`,
          header: "Confirmação",
          acceptLabel: "Sim",
          rejectLabel: "Não",
          acceptButtonStyleClass:"p-button-text p-button-text",
          rejectButtonStyleClass:"p-button-danger p-button-text",
          accept: () => {
            if(item.id) {
              this.petService.apagarPorId(item.id).subscribe((item) => {
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
        this.router.navigate(['pets/novo']);
      }
    
      editar(id: number) {
        this.router.navigate([`pets/${id}`])
      }
}
