import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDatePickerModule} from 'mydatepicker';
import {UserFirstNameFilter, OrderByPipe, ProjectFilter} from '../pipe';
import {  FormBuilder,FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './project.component';
import { fn } from '@angular/compiler/src/output/output_ast';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  const fb: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent,UserFirstNameFilter, OrderByPipe, ProjectFilter ],
      imports:[FormsModule,RouterTestingModule,ReactiveFormsModule,HttpModule , HttpClientModule,MyDatePickerModule],
      providers: [ { provide: FormBuilder, useValue: fb }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('calling reset method should set msg to be empty',()=>
{
spyOn(component,"resetForm").and.callThrough();
//component.msg="";
component.resetForm();
expect(component.msg).toBe("");
})
it('calling reset method should reset project form',()=>
{
spyOn(component,"projectFrm").and.callThrough();
//component.msg="";
component.resetForm();
expect(component.projectFrm).toBeDefined();

})
it('calling clearDate method should reset project form date',()=>
{
spyOn(component,"projectFrm").and.callThrough();
//component.msg="";
component.clearDate();

expect(component.projectFrm.get('startDate')).toBeNull();
})
it('calling setClickedRow should set value of selectedRow',()=>{
  spyOn(component,"setClickedRow").and.callThrough();
//component.msg="";
component.setClickedRow(1,1);
expect(component.selectedRow).toBe(1);
})
});

