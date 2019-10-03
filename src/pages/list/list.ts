import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  Races: any; // Change later

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

  }

  async ionViewDidLoad() {
    this.Races = <any>[];
    const rawRaces = await this.storage.get('races')
    this.Races = JSON.parse(rawRaces);
    console.log(this.Races);
  }


}
