import { TestBed } from '@angular/core/testing';
import {  HttpModule } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule, HttpModule]
  }));

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
  it('Get all Projects should return observable',(done:DoneFn)=>{
    const service: ProjectService = TestBed.get(ProjectService);
    service.getProjects().subscribe(value=>{ expect(value).length>0 });
    done();
  });
 
});
