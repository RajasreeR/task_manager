import { TestBed, async, inject } from '@angular/core/testing';
import { TaskserviceService } from './taskservice.service';
import { HttpClientModule } from '@angular/common/http';

describe('TaskserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskserviceService],
      imports: [
        HttpClientModule,
    ]
    });
  });

  it('should be created', async(inject([TaskserviceService], (service: TaskserviceService) => {
    expect(service).toBeTruthy();
  })));
  it('#getValue should return real value', async(inject([TaskserviceService], (service: TaskserviceService) => {
    expect(service.getAllTasks()).toBe('real value');
  })));
});
