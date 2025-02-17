import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contato } from '../../../models/contato.type';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-edit-contato',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputTextModule, ReactiveFormsModule, RadioButtonModule],
  templateUrl: './edit-contato.component.html',
  styleUrl: './edit-contato.component.scss'
})
export class EditContatoComponent {
  @Input()
  visible: boolean = false;
  
  @Output() 
  dialogClosed: EventEmitter<void> = new EventEmitter();

  @Output()
  contatoSalvo = new EventEmitter<Contato>();
  contatoForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {
    this.contatoForm = this.fb.group({
      tipo: ['', [Validators.required]],
      tag: ['', [Validators.required]]
    });
  }

  fechar() {
    this.dialogClosed.emit();
  }

  salvar() {
      if (this.contatoForm.valid) {
            this.contatoSalvo.emit(this.contatoForm.value as Contato);
            this.contatoForm.reset();
          }
    }
  
    
  
    limpar(): void {
      this.contatoForm.reset();
    }
}
