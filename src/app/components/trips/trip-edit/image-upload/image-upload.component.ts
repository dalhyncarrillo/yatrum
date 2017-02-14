import { Observable } from 'rxjs/Observable';
import { CloudinaryIntegrationService } from './../../../../services/cloudinary-integration.service';
import { Place } from './../../../../models/place';
import {
  Component, OnInit, Input, Output, EventEmitter, Renderer, ElementRef, ViewChild
} from '@angular/core';

@Component({
  selector: 'tr-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Output() imageData = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;
  cloudImages = [];

  constructor(private cloudinaryService: CloudinaryIntegrationService, private renderer: Renderer) { }

  ngOnInit() {
  }

  handleOnChange(event) {
    let files: any = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    let files_list = [];
    let pattern = /image-*/;
    for (let i = 0; i < files.length; i++) {
      files_list.push(files[i]);
    }
    files_list.forEach((file: File) => {
      if (!file.type.match(pattern)) {
        alert('Remove non image format files');
        return;
      }
      let reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    });
  }

  private handleReaderLoaded(e) {
    let reader = e.target;
    let imageUrl = reader.result;
    this.uploadMedia(imageUrl);
  }

  private uploadMedia(imageUrl: string) {
    let cloudUpload$: Observable<any> = this.cloudinaryService.uploadPlacePicture(imageUrl);
    cloudUpload$.subscribe(image => {
      this.imageData.emit({
        id: null,
        description: '',
        url: image.url,
        public_id: image.public_id,
        _destroy: false
      })
    })
  }

  showImageBrowseDlg() {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileInput.nativeElement, 'dispatchEvent', [event]);
  }

}
