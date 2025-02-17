import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { Endereco } from '../../../models/endereco.type';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-endereco',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './edit-endereco.component.html',
  styleUrl: './edit-endereco.component.scss'
})
export class EditEnderecoComponent {
  @Input()
  visible: boolean = false;
  
  @Output() 
  dialogClosed: EventEmitter<void> = new EventEmitter();

  @Output()
  enderecoSalvo = new EventEmitter<Endereco>();


  
  enderecoForm: FormGroup;

  constructor(
      private fb: FormBuilder,
    ) {
      this.enderecoForm = this.fb.group({
        logradouro: ['', [Validators.required, Validators.minLength(3)]],
        complemento: ['', []],
        bairro: ['', [Validators.required, Validators.minLength(3)]],
        cidade: ['', [Validators.required, Validators.minLength(3)]]
      });
    }
  fechar() {
    this.dialogClosed.emit();
  }
  salvar() {
    if (this.enderecoForm.valid) {
          this.enderecoSalvo.emit(this.enderecoForm.value as Endereco);
          this.enderecoForm.reset();
        }
  }

  

  limpar(): void {
    this.enderecoForm.reset();
  }

}
