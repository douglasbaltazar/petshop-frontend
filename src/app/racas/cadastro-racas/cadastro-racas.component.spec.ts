import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRacasComponent } from './cadastro-racas.component';

describe('CadastroRacasComponent', () => {
  let component: CadastroRacasComponent;
  let fixture: ComponentFixture<CadastroRacasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroRacasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroRacasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
