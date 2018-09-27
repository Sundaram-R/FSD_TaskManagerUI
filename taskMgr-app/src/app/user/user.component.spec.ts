import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import {  FormBuilder,FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {UserFirstNameFilter, OrderByPipe} from '../pipe';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import { User } from './model/user';

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
it('calling sort method should set column value for pipe',()=>
{
spyOn(component,'sort');
component.sort('firstName');
expect(component.column).toBe('firstName');
})
it('calling editUser method should set button title',()=>
{
spyOn(component,'editUser').and.callThrough();
component.user = {"id":2 , "firstName":"first", "lastName":"last", "employeeId":123};
component.users=new Array<User>();
component.users.push(component.user);
component.editUser(2);
expect(component.btnTitle).toBe('Edit User');

})
it('calling editUser method should have value for user',()=>
{
spyOn(component,'editUser');

component.user = {"id":2 , "firstName":"first", "lastName":"last", "employeeId":123};
component.users=new Array<User>();
component.users.push(component.user);
component.editUser(2);
expect(component.user).toBeDefined();

})
});
