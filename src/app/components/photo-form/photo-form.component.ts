import { Component, OnInit } from '@angular/core';

import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  file: File;
  photoSelected: string | ArrayBuffer;

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit(): void {}

  onPhotoSelected(e: HtmlInputEvent): void {
    if (e.target.files && e.target.files[0]) {
      this.file = <File>e.target.files[0];
      // Image previer
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLInputElement): boolean {
    this.photoService
      .createPhoto(title.value, description.value, this.file)
      .subscribe(
        (res) => {
          this.router.navigate(['/photos']);
        },
        (err) => console.log(err)
      );

    return false;
  }
}
