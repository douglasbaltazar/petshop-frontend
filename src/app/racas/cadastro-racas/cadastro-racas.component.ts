import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RacaService } from '../../services/raca/raca.service';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { Raca } from '../../models/raca.type';

@Component({
  selector: 'app-cadastro-racas',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './cadastro-racas.component.html',
  styleUrl: './cadastro-racas.component.scss'
})
export class CadastroRacasComponent implements OnInit {
  cadastroForm: FormGroup;
  id?: number; // ID vindo da URL

  constructor(
    private fb: FormBuilder,
    private racaService: RacaService,
    private route: ActivatedRoute
  ) {
    this.cadastroForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // Pegando o ID da URL
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam; // Convertendo para número
        this.carregarDados();
      }
    });
  }

  carregarDados(): void {
    this.racaService.getDto(this.id!).subscribe((raca) => {
      if (raca) {
        this.cadastroForm.patchValue({
          descricao: raca.descricao
        });
      }
    });
  }

  salvar(): void {
    if (this.cadastroForm.valid) {
      console.log('Dados salvos:', this.cadastroForm.value);
      // alert(this.id ? 'Cadastro atualizado com sucesso!' : 'Cadastro realizado com sucesso!');
      this.cadastroForm.reset();
      this.racaService.gravar(this.cadastroForm.value)
      if(this.id) {
        this.racaService.atualizar(this.id, this.cadastroForm.value as Raca).subscribe((raca) => {
          console.log(raca);
        });
      } else {
        this.racaService.gravar(this.cadastroForm.value as Raca).subscribe((raca) => {
          console.log(raca);
        });
      }
    }
  }

  limpar(): void {
    this.cadastroForm.reset();
  }

}


