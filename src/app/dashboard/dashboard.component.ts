import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card'
import { InfoService } from '../services/info/info.service';
import { Info } from '../models/info.type';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  info?: Info;

  constructor(private infoService: InfoService) {

  }

  carregarDados() {
    this.infoService.getInfos().subscribe((info) => {
      this.info = info;
    })
  }

  ngOnInit(): void {
    this.carregarDados();
  }
  

}
