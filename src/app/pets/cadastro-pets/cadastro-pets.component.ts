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

@Component({
  selector: 'app-cadastro-pets',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, DropdownModule, CalendarModule],
  templateUrl: './cadastro-pets.component.html',
  styleUrl: './cadastro-pets.component.scss'
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
    private clienteService: ClienteService
  ) {
    this.cadastroForm = this.fb.group({
      nome: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      cliente: [null, Validators.required],
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
    if(this.id) {
      this.petService.getDto(this.id!).subscribe((pet) => {
        if (pet) {
          this.cadastroForm.patchValue({
            descricao: pet.nome
          });
        }
      });

    }

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
  }

  salvar(): void {
    if (this.cadastroForm.valid) {
      console.log('Dados salvos:', this.cadastroForm.value as Pet);
      let pet: Pet = this.cadastroForm.value as Pet
      if(this.id) {
        pet.id = this.id;
        this.petService.atualizar(this.id, pet).subscribe((pet) => {
          console.log(pet);
        });
      } else {
        this.petService.gravar(pet).subscribe((pet) => {
          console.log(pet);
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
