import { TestBed } from '@angular/core/testing';

import { DragDropServiceService } from './drag-drop-service.service';

describe('DragDropServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DragDropServiceService = TestBed.get(DragDropServiceService);
    expect(service).toBeTruthy();
  });
});
