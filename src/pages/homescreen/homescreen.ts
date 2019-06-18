import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Time } from '@angular/common';

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
  firstPlaceTime: Time;
  yourTime: Time;

  constructor(public navCtrl: NavController, public navParams: NavParams, private API: ApiProvider) {
  }

  async ionViewDidLoad() {
    const response = await this.API.GetRaces();
    console.log(response);
  }

  async calcPB() {
    const difference = this.firstPlaceTime.minutes - this.firstPlaceTime.minutes;
    const percentBack = ((difference / this.firstPlaceTime.minutes) * 100).toFixed(2);
    console.log(percentBack);
  }

}
