import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileLoaderComponent } from '../file-loader/file-loader.component';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-file-list',
  imports: [FileLoaderComponent, SlicePipe],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent implements OnInit {
  @Output() loadJsonData = new EventEmitter<string>();

  private lsKey = "family-tree-file-list";

  files: LoadedFile[] = [];

  ngOnInit(): void {
    this.initFromLocalStorage();
  }

  fileLoaded(file: File) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = (evt) => {
      if (evt.target?.result && typeof evt.target.result == "string") {
        let contents = evt.target.result;
        let size = file.size / Math.pow(1024, 1);

        let loadedFile = new LoadedFile(file.name, contents, size);
        this.files.push(loadedFile);
        this.saveToLocalStorage();
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

  toDateString(dateNr: number) {
    let date = new Date(dateNr);
    return `${date.toLocaleDateString()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  saveToLocalStorage() {
    localStorage.setItem(this.lsKey, JSON.stringify(this.files));
  }

  initFromLocalStorage() {
    const lsVal = localStorage.getItem(this.lsKey);

    if (lsVal) {
      this.files = JSON.parse(lsVal);
    }
  }
}

export class LoadedFile {
  name: string;
  date: number;
  contents: string;
  sizeKb: number;

  constructor(name: string, contents: string, sizeKb: number) {
    this.name = name;
    this.contents = contents;
    this.sizeKb = sizeKb;
    this.date = Date.now();
  }
}