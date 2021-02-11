import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogFromUrlComponent } from './dog-from-url.component';

describe('DogFromUrlComponent', () => {
  let component: DogFromUrlComponent;
  let fixture: ComponentFixture<DogFromUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogFromUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogFromUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
