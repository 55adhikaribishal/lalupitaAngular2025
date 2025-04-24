import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductDetailsComponent } from './view-product-details.component';

describe('ViewProductDetailsComponent', () => {
  let component: ViewProductDetailsComponent;
  let fixture: ComponentFixture<ViewProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProductDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
