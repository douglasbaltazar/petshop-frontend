import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Pet } from '../../models/pet.type';
import { Cliente } from '../../models/cliente.type';
import { PetService } from '../../services/pet/pet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Atendimento } from '../../models/atendimento.type';
import { AtendimentosService } from '../../services/atendimentos/atendimentos.service';

@Component({
  selector: 'app-cadastro-atendimentos',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, DropdownModule, CalendarModule],
  templateUrl: './cadastro-atendimentos.component.html',
  styleUrl: './cadastro-atendimentos.component.scss'
})
export class CadastroAtendimentosComponent implements OnInit {

  cadastroForm: FormGroup;
    id?: number; 
  
    clientes: Cliente[] = [];
    pets: Pet[] = [];

    constructor(
        private fb: FormBuilder,
        private atendimentoService: AtendimentosService,
        private route: ActivatedRoute,
        private router: Router,
        private petService: PetService,
        private clienteService: ClienteService
      ) {
        this.cadastroForm = this.fb.group({
          descricao: [null, Validators.required],
          data: [null, Validators.required],
          valor: [null, Validators.required],
          pet: [null, Validators.required]
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
          this.atendimentoService.getDto(this.id!).subscribe((atendimento) => {
            if (atendimento) {
              this.cadastroForm.patchValue({
                descricao: atendimento.descricao,
                valor: atendimento.valor,
                data: atendimento.data,
                pet: atendimento.pet
              });
            }
          });
    
        }
        this.clienteService.listar().subscribe((clientes) => {
          if(clientes) {
            this.clientes = clientes;
          }
        });
        this.petService.listar().subscribe((pets) => {
          if(pets) {
            this.pets = pets;
          }
        })
      }

      salvar(): void {
        if (this.cadastroForm.valid) {
          console.log('Dados salvos:', this.cadastroForm.value as Atendimento);
          let atendimento: Atendimento = this.cadastroForm.value as Atendimento
          if(this.id) {
            atendimento.id = this.id;
            this.atendimentoService.atualizar(this.id, atendimento).subscribe((pet) => {
              console.log(pet);
            });
          } else {
            this.atendimentoService.gravar(atendimento).subscribe((atendimento) => {
              console.log(atendimento);
            });
          }
          this.cadastroForm.reset();
          this.voltar();
        }
      }
    
      voltar() {
        this.router.navigate(['atendimentos']);
      }
    
      limpar(): void {
        this.cadastroForm.reset();
      }
      

}
