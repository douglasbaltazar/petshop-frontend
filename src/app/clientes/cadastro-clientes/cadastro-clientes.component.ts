import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RacaService } from '../../services/raca/raca.service';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { Raca } from '../../models/raca.type';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton'
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../../models/cliente.type';
import { Usuario } from '../../models/usuario.type';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, PanelModule, RadioButtonModule],
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.scss'
})
export class CadastroClientesComponent implements OnInit {
  clienteForm: FormGroup;
  id?: number; 

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      perfil: ['', [Validators.required, Validators.minLength(3)]],
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
  }

  carregarDados(): void {
    this.clienteService.getDto(this.id!).subscribe((cliente) => {
      if (cliente) {
        this.clienteForm.patchValue({
          nome: cliente.usuario?.nome,
          cpf: cliente.usuario?.cpf,
          perfil: cliente.usuario?.perfil
        });
      }
    });
  }

  salvar(): void {
    if (this.clienteForm.valid) {
      console.log('Dados salvos:', this.clienteForm.value as Usuario);
      let usuario: Usuario = {
        nome: this.clienteForm.value.nome,
        cpf: this.clienteForm.value.cpf,
        perfil: this.clienteForm.value.perfil,
      }
      let cliente: Cliente = {
        usuario: usuario,
      }
      if(this.id) {
        cliente.id = this.id;
        this.clienteService.atualizar(this.id, cliente).subscribe((cliente) => {
          console.log(cliente);
        });
      } else {
        usuario.senha = this.clienteForm.value.senha
        this.clienteService.gravar(cliente).subscribe((cliente) => {
          console.log(cliente);
        });
      }
      this.clienteForm.reset();
    }
  }

  voltar() {
    this.router.navigate(['clientes']);
  }

  limpar(): void {
    this.clienteForm.reset();
  }
  

}



