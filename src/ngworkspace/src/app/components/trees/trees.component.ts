import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeDataService } from '../../services/treedata.service';
import { CollapsibleTreeComponent } from '../../components/trees/collapsible-tree/collapsible-tree.component';
import { LeafletMapComponent } from '../../components/maps/leaflet-map/leaflet-map.component';
import { FileListComponent } from '../file-list/file-list.component';

@Component({
  selector: 'app-trees',
  imports: [CollapsibleTreeComponent, LeafletMapComponent, FileListComponent],
  providers: [TreeDataService],
  templateUrl: './trees.component.html'
})
export class TreesComponent implements OnInit {
  jsonData: string | undefined;

  constructor() {

  }

  ngOnInit(): void {
  }

  loadJsonData(jsonData: string) {
    this.jsonData = jsonData;
  }
}
