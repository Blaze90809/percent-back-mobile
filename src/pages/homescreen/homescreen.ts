import { RaceRequest } from './../../models/api';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Time } from '@angular/common';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HomescreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homescreen',
  templateUrl: 'homescreen.html',
})
export class HomescreenPage {

  raceName: string;
  raceDistance: number;
  raceDate: Date;
  firstPlaceTimeHours: number;
  firstPlaceTimeMinutes: number;
  firstPlaceTimeSeconds: number;
  yourTimeHours: number;
  yourTimeMinutes: number;
  yourTimeSecounds: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private API: ApiProvider, private storage: Storage) {
  }

  async ionViewDidLoad() {
    await this.getRaces();
  }

  async calcPB() {
    const firstPlaceTime = ((+this.firstPlaceTimeHours * 60) + +this.firstPlaceTimeMinutes + (+this.firstPlaceTimeSeconds * 0.0166667))
    const yourTime = ((+this.yourTimeHours * 60) + +this.yourTimeMinutes + (+this.yourTimeSecounds * 0.0166667))
    const difference = (yourTime - firstPlaceTime)
    const percentBack = ((difference / firstPlaceTime) * 100).toFixed(2);

    const req = new RaceRequest();
    req.raceName = this.raceName;
    req.raceDate = this.raceDate.toString();
    req.raceDistance = this.raceDistance.toString();
    req.percentBack = +percentBack;

    const response = await this.API.PostRace(req)

    await this.getRaces();
  }

  async getRaces() {
    const response = await this.API.GetRaces();
    console.log(response);
    await this.storage.set('races', JSON.stringify(response));
  }

}
