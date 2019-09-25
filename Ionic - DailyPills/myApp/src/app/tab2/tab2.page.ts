import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  item: [];

  constructor(private http: HttpClient, private nativeHTTP: HTTP) {
    // @ts-ignore
    http.get('http://localhost:8000/farmaci').toPromise()
        .then((res) => {
            const { data } = (res as any);
            this.item = data;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
  }
}
