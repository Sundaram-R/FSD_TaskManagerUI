import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {  HttpModule, Http,RequestOptions, Response, BaseRequestOptions, XHRBackend, ResponseOptions, ConnectionBackend } from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { Injector } from '@angular/core';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule, HttpModule],
    providers: [      
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
          }
       }
    ]
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
  it('Get User should return observable',(done:DoneFn)=>{
    const service: UserService = TestBed.get(UserService);
    service.getUser(1).subscribe(value=>{ expect(value).length>0 });
    done();
  });
  
});
