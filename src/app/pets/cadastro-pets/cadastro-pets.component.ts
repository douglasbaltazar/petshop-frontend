import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RacaService } from '../../services/raca/raca.service';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { Raca } from '../../models/raca.type';
import { PetService } from '../../services/pet/pet.service';
import { Pet } from '../../models/pet.type';
import { Cliente } from '../../models/cliente.type';
import { ClienteService } from '../../services/cliente/cliente.service';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cadastro-pets',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, DropdownModule, CalendarModule, ToastModule],
  templateUrl: './cadastro-pets.component.html',
  styleUrl: './cadastro-pets.component.scss',
  providers: [MessageService]
})
export class CadastroPetsComponent implements OnInit {
  cadastroForm: FormGroup;
  id?: number; 

  clientes: Cliente[] = [];
  racas: Raca[] = [];

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router,
    private racaService: RacaService,
    private clienteService: ClienteService,
    private messageService: MessageService
  ) {
    this.cadastroForm = this.fb.group({
      nome: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      cliente: [],
      raca: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = Number(idParam);
        this.carregarDados();
      }
    });
    this.carregarDados();
  }

  carregarDados(): void {
    

    this.clienteService.listar().subscribe((clientes) => {
      if(clientes) {
        this.clientes = clientes;
      }
    });
    this.racaService.listar().subscribe((racas) => {
      if(racas) {
        this.racas = racas;
      }
    })
    if(this.id) {
      this.petService.getDto(this.id!).subscribe((pet) => {
        if (pet) {
          this.cadastroForm.patchValue({
            nome: pet.nome,
            dataNascimento: pet.dataNascimento,
            cliente: pet.cliente,
            raca: pet.raca
          });
        }
      });

    }
  }

  salvar(): void {
    if (this.cadastroForm.valid) {
      let pet: Pet = this.cadastroForm.value as Pet
      if(this.id) {
        pet.id = this.id;
        this.petService.atualizar(this.id, pet).subscribe((pet) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cadastro atualizado com sucesso' });
          setTimeout(() => {
            this.voltar();
          }, 250)
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Houve algum erro.' });
        });
      } else {
        this.petService.gravar(pet).subscribe((pet) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cadastro concluido com sucesso' });
          setTimeout(() => {
            this.voltar();
          }, 250)
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Houve algum erro.' });
        });
      }
      this.cadastroForm.reset();
    }
  }

  voltar() {
    this.router.navigate(['pets']);
  }

  limpar(): void {
    this.cadastroForm.reset();
  }

}
