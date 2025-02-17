import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAtendimentosComponent } from './cadastro-atendimentos.component';

describe('CadastroAtendimentosComponent', () => {
  let component: CadastroAtendimentosComponent;
  let fixture: ComponentFixture<CadastroAtendimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAtendimentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
