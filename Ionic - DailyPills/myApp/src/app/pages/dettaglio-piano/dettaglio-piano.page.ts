import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dettaglio-piano',
  templateUrl: './dettaglio-piano.page.html',
  styleUrls: ['./dettaglio-piano.page.scss'],
})
export class DettaglioPianoPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    public navCtrk: NavController,

  ) { }

  ngOnInit() {

  }

}
