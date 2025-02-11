import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-racas',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './racas.component.html',
  styleUrl: './racas.component.scss'
})
export class RacasComponent implements OnInit {
  items: any[] = [];

  ngOnInit() {
    // Dados de exemplo
    this.items = [
      { id: 1, description: 'Item 1' },
      { id: 2, description: 'Item 2' },
      { id: 3, description: 'Item 3' },
      { id: 4, description: 'Item 4' },
      { id: 5, description: 'Item 5' }
    ];
  }

  editItem(item: any) {
    console.log('Edit item:', item);
  }

  deleteItem(item: any) {
    console.log('Delete item:', item);
  }
}