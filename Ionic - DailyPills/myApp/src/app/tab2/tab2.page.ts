import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  item: any;

  constructor(private http: HttpClient, private nativeHTTP: HTTP) {
    this.searchData();
  }

  searchData() {
    // @ts-ignore
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json' );
    headers.append('Access-Control-Allow-Headers', 'application/json' );
    headers.append('responseType', '\'text\' as \'json\'');
    this.http.get('https://www.agenziafarmaco.gov.it/services/search/select?fl=sm_field_codice_farmaco,sm_field_descrizione_farmaco,sm_field_descrizione_ditta&q=bundle:confezione_farmaco+sm_field_descrizione_farmaco:tachi*&df=sm_field_descrizione_farmaco&wt=jsonp&rows=150000', { headers }).subscribe(res => { console.log(res); this.item = res; });
  }
}
