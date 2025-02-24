import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Coluna } from '../models/coluna.type';
import { HasRoleDirective } from '../directives/has-hole.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabela-padrao',
  standalone: true,
  imports: [TableModule, ButtonModule, HasRoleDirective, CommonModule],
  templateUrl: './tabela-padrao.component.html',
  styleUrl: './tabela-padrao.component.scss'
})
export class TabelaPadraoComponent {
  @Input() items: any[] = [];
  @Input() rows: number = 5;
  @Input() tableMinWidth: string = '50rem';
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];

  @Input() columns: Array<Coluna> = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();


  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  getFieldValue(item: any, field: string): any {
    return field.split('.').reduce((acc, part) => (acc ? acc[part] : null), item);
  }


}
