import { Component, OnInit } from '@angular/core';
import { Piano } from '../../models/piano.model';
import { PianoServices } from '../../services/piano.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-piani',
  templateUrl: './lista-piani.page.html',
  styleUrls: ['./lista-piani.page.scss'],
})
export class ListaPianiPage implements OnInit {

  private pianilist$: Observable<Piano[]>;

  constructor(
      private pianoService: PianoServices,
      private navController: NavController
  ) { }

  ngOnInit() {
    this.pianilist$ = this.pianoService.listPiani();
  }

  refreshPiani(event) {
    setTimeout(() => {
      this.pianilist$ = this.pianoService.listPiani();
      event.target.complete();
    }, 1500);
  }

  pianoDetailNav(piano: Piano) {
    console.log('clicked');
  }

  delete(piano: Piano) {
    console.log('deleted');
  }

  addPiano() {
    this.navController.navigateForward('nuovo-piano');
  }

}
