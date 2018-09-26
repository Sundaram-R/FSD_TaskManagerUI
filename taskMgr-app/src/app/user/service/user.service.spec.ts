import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {  HttpModule } from '@angular/http';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule, HttpModule]
    
  })
  
  );

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
  it('Get Users should return observable',(done:DoneFn)=>{
    const service: UserService = TestBed.get(UserService);
    service.getUsers().subscribe(value=>{ expect(value).length>0 });
    done();
  });
  
});
