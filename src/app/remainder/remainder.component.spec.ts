import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainderComponent } from './remainder.component';

describe('RemainderComponent', () => {
  let component: RemainderComponent;
  let fixture: ComponentFixture<RemainderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemainderComponent]
    });
    fixture = TestBed.createComponent(RemainderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
