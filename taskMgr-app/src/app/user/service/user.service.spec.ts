import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('UserService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]
  })
  );

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
  it('should return observable',(done:DoneFn)=>{
    const service: UserService = TestBed.get(UserService);
    service.getUsers().subscribe(value=>{ expect(value).toBeGreaterThan(1) });
    done();
  });
  
});
