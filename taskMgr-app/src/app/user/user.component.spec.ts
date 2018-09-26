import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import {  FormBuilder,FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {UserFirstNameFilter, OrderByPipe} from '../pipe';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  const fb: FormBuilder = new FormBuilder();
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent,OrderByPipe,UserFirstNameFilter ],
      imports:[FormsModule,RouterTestingModule,ReactiveFormsModule,HttpModule , HttpClientModule],
      providers: [ { provide: FormBuilder, useValue: fb }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
