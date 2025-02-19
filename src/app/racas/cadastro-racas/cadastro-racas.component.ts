import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RacaService } from '../../services/raca/raca.service';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { Raca } from '../../models/raca.type';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro-racas',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './cadastro-racas.component.html',
  styleUrl: './cadastro-racas.component.scss',
  providers: [MessageService]
})
export class CadastroRacasComponent implements OnInit {
  cadastroForm: FormGroup;
  id?: number; 

  constructor(
    private fb: FormBuilder,
    private racaService: RacaService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.cadastroForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]]
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
      let raca: Raca = {
        descricao: this.cadastroForm.value.descricao,
      }
      if(this.id) {
        raca.id = this.id;
        this.racaService.atualizar(this.id, raca).subscribe((raca) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cadastro atualizado com sucesso' });
          setTimeout(() => {
            this.voltar();
          }, 250)
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Houve algum erro.' });
        });
      } else {
        this.racaService.gravar(raca).subscribe((raca) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cadastro atualizado com sucesso' });
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
    this.router.navigate(['racas']);
  }

  limpar(): void {
    this.cadastroForm.reset();
  }

}


