import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDatePickerModule} from 'mydatepicker';
import {UserFirstNameFilter, OrderByPipe} from '../pipe';
import { TaskComponent } from './task.component';
import {  FormBuilder,FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  const fb: FormBuilder = new FormBuilder();
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({      
      declarations: [ TaskComponent,UserFirstNameFilter, OrderByPipe ],
      imports:[FormsModule,RouterTestingModule,ReactiveFormsModule,HttpModule , HttpClientModule,MyDatePickerModule],
      providers: [ { provide: FormBuilder, useValue: fb }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
