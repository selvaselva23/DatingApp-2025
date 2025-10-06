import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {

  protected loaction = inject(Location);

  goBack(){
    this.loaction.back()
  }
}
