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
});
