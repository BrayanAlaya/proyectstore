import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  public tab: number = 0
  public buttonTabText = "Continuar"
  public colorControl = new FormControl('primary' as ThemePalette);
  public srcImage: Array<Object> = []
  public imagesArray: Array<Object> = []
  public srcIndex: number = 0

  constructor(

  ) {
    this.srcImage.push("../../../../../assets/imageNotFound.jpg")
  }

  selectTab(index: number) {
    this.tabGroup.selectedIndex = index;
  }

  nextTab(): number {

    this.tab += 1
    if (this.tab == this.tabGroup._tabs.length) {
      this.tab = 0
    }

    if (this.tab == (this.tabGroup._tabs.length - 1)) {
      this.buttonTabText = "Inicio"
    } else {
      this.buttonTabText = "Continuar"
    }

    return this.tab

  }

  uploadimage(e: any): void {

    let images = e.target.files


    if (images.length > 0 && images.length < 5) {
      this.srcImage = []
      this.imagesArray = []
      this.srcIndex = 0
      for (let i = 0; i < images.length; i++) {
        this.imagesArray.push(images[i]);

        var reader = new FileReader();
        reader.readAsDataURL(images[i])
        reader.onload = (event: any) => {
          this.srcImage.push(event.target.result)
        }
      }
    }
  }

  deleteImage(): void {
    this.imagesArray = []
    this.srcImage = []
    this.srcIndex = 0
  }

  onSliderIconBackClick(): void {
    if (this.srcIndex > 0) {
      this.srcIndex--
    }
  }
  onSliderIconForwardClick(): void {
    if (this.srcIndex < this.imagesArray.length-1) {
      this.srcIndex++
    }
  }
}
