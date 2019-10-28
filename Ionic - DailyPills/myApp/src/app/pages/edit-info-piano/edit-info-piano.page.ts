import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-info-piano',
  templateUrl: './edit-info-piano.page.html',
  styleUrls: ['./edit-info-piano.page.scss'],
})
export class EditInfoPianoPage implements OnInit {
  private currentDate$: string;

  constructor() { }

  ngOnInit() {
    this.currentDate$ = new Date().toString();
  }

}
