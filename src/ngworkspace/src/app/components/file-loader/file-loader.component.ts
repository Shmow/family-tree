import { Component, EventEmitter, Output } from '@angular/core';
import { FileDropDirective } from '../../directives/file-drop.directive';

@Component({
  selector: 'app-file-loader',
  imports: [FileDropDirective],
  templateUrl: './file-loader.component.html',
  styleUrl: './file-loader.component.scss'
})
export class FileLoaderComponent {
  @Output() fileLoaded = new EventEmitter<File>();

  onFilesDropped(file: File) {
    this.emitFile(file);
  }

  private emitFile(file: File) {
    this.fileLoaded.emit(file);
  }

  onFileInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.emitFile(inputElement.files[0]);
    }
  }

  isValidJSON(jsonString: string) {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
}
