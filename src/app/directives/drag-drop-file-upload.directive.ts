import { Directive, EventEmitter, Output, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDragDropFileUpload]'
})
export class DragDropFileUploadDirective {

  @Output() fileDropped = new EventEmitter<any>();
  @Output() hovered =  new EventEmitter<boolean>();

  @HostBinding('style.background-color') private background = '#ffffff';

  // Dragover Event
  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  // Dragleave Event
  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

  // Drop Event
  @HostListener('drop', ['$event'])
  onDrop($event) {
    $event.preventDefault();
    this.fileDropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  constructor() { }

}
