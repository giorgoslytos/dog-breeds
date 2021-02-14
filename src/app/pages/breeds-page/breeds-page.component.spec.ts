import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedsPageComponent } from './breeds-page.component';

describe('BreedsPageComponent', () => {
  let component: BreedsPageComponent;
  let fixture: ComponentFixture<BreedsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
