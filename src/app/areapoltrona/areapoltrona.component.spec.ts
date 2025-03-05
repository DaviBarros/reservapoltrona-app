import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreapoltronaComponent } from './areapoltrona.component';

describe('AreapoltronaComponent', () => {
  let component: AreapoltronaComponent;
  let fixture: ComponentFixture<AreapoltronaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreapoltronaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreapoltronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
