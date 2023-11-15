import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private sanitizer: DomSanitizer) { }

  imageFile2URLconverter(imageFile: string, fileName: string, fileType: string): SafeUrl {

    const byteString = window.atob(imageFile);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8array[i] = byteString.charCodeAt(i);
    }

    const imageBlog: Blob = new Blob([int8array], { type: fileType });
    const f: File = new File([imageBlog], fileName, { type: fileType });
    const imageURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(f));
    return imageURL;

  }

}
