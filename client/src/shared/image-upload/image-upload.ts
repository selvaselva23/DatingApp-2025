import { Component, signal } from '@angular/core';
import { every } from 'rxjs';
import { input } from '@angular/core';

import { output } from '@angular/core';

import { Event } from '@angular/router';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css'
})
export class ImageUpload {

  protected imageSrc = signal <string | ArrayBuffer | null | undefined>(null);
  protected isDragging = false;

  private fileUpload: File | null = null;

  uploadFile = output<File>();
  loading = input<boolean>(false);

  onDragOver(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

   onDragLeave(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();

    this.isDragging = false

    if(event.dataTransfer?.files.length){
      const file = event.dataTransfer.files[0];
      this.PreviewImage(file)
      this.fileUpload= file;
    }
  }

  private PreviewImage(file: File){
    const reader = new FileReader();
    reader.onload = (e) => this.imageSrc.set(e.target?.result);
    reader.readAsDataURL(file);
  }


  onCancel(){
    this.fileUpload= null;
    this.imageSrc.set(null)
  }

  onFileUpload(){
    if(this.fileUpload){
      this.uploadFile.emit(this.fileUpload)
    }
  }

}
