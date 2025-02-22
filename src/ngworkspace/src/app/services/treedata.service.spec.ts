import { TestBed } from '@angular/core/testing';

import { TreeDataService } from './treedata.service';

describe('TreedataService', () => {
  let service: TreeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
