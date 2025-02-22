import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({  
  standalone: true,
  selector: '[appFileDrop]'
})
export class FileDropDirective {
  @Output() filesDropped = new EventEmitter<File>();
  @HostBinding('class.file-over') fileOver: boolean = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    if (event.dataTransfer?.files) {
      this.filesDropped.emit(event.dataTransfer.files[0]);
    }
  }
}
