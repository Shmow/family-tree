import { Component, EventEmitter, Output } from '@angular/core';
import { FileLoaderComponent } from '../file-loader/file-loader.component';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-file-list',
  imports: [FileLoaderComponent, SlicePipe],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent {
  @Output() loadJsonData = new EventEmitter<string>();

  files: LoadedFile[] = [];

  fileLoaded(file: File) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = (evt) => {
      if (evt.target?.result && typeof evt.target.result == "string") {
        let contents = evt.target.result;
        let size = file.size / Math.pow(1024, 1);

        let loadedFile = new LoadedFile(file.name, contents, size);
        this.files.push(loadedFile);
      };
    }
  }

  loadLoadedFile(file: LoadedFile) {
    this.loadJsonData.emit(file.contents);
  }

  deleteLoadedFile(file: LoadedFile) {
    var indx = this.files.indexOf(file);
    if (indx > -1) {
      this.files.splice(indx, 1);
    }
  }
}

export class LoadedFile {
  name: string;
  contents: string;
  sizeKb: number;

  constructor(name: string, contents: string, sizeKb: number) {
    this.name = name;
    this.contents = contents;
    this.sizeKb = sizeKb;
  }
}