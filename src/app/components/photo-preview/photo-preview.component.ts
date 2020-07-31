import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/interfaces/photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css'],
})
export class PhotoPreviewComponent implements OnInit {
  private id: string;
  public photo: Photo;

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.id = params.id;
      this.photoService.getPhoto(this.id).subscribe(
        (res) => {
          this.photo = res['photoDB'];
        },
        (err) => console.log(err)
      );
    });
  }

  updateDataPhoto(
    title: HTMLInputElement,
    description: HTMLInputElement
  ): boolean {
    this.photoService
      .updatePhoto(this.id, title.value, description.value)
      .subscribe(
        (res) => {
          this.route.navigate(['/photos']);
        },
        (err) => {
          console.log(err);
        }
      );

    return false;
  }

  deletePhoto(): boolean {
    this.photoService.deletePhoto(this.id).subscribe(
      (res) => {
        this.route.navigate(['/photos']);
      },
      (err) => {
        console.log(err);
      }
    );

    return false;
  }
}
