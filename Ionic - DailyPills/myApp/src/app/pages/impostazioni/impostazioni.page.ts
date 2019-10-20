import { Component, OnInit } from '@angular/core';
import { Lingua, LinguaService } from '../../services/lingua.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.page.html',
  styleUrls: ['./impostazioni.page.scss'],
})
export class ImpostazioniPage implements OnInit {

  private lingue: Lingua[];
  private profiloFormModel: FormGroup;

  constructor(
      private lingService: LinguaService,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.lingue = this.lingService.getLingue();

    this.profiloFormModel = this.formBuilder.group({
      linguaPreferita: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.lingService.getLinguaAttuale().subscribe((lingua) => {
      this.profiloFormModel.patchValue({linguaPreferita: lingua});
    });
  }

  onSubmit(): void {
    this.lingService.updateLingua(this.profiloFormModel.value.linguaPreferita);
  }

}
