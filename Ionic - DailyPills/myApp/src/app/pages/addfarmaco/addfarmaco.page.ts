import {Component, OnInit} from '@angular/core';
import {FarmacoServices} from '../../services/farmaco.services';
import {Farmaco} from '../../models/farmaco.model';

@Component({
  selector: 'app-addfarmaco',
  templateUrl: './addfarmaco.page.html',
  styleUrls: ['./addfarmaco.page.scss']
})
export class AddfarmacoPage implements OnInit {
  private farmaciList$: Farmaco[];
  private farmaci$: Farmaco[];

  constructor(private farmacoServices: FarmacoServices) {}

  ngOnInit() {
    this.farmacoServices.listFarmaci().subscribe((arrMed) => {
      this.farmaciList$ = arrMed;
      this.farmaci$ = arrMed;
    });
  }

  liveMedicineFilter($event) {
    console.log('filtering');
    this.farmaciList$ = this.farmaci$.filter((val) => val.nome.toLowerCase().includes($event.target.value.toLowerCase()));
  }

}
