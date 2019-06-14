import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { response } from '../../models/api';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email: string;
  password: string;
  response: response;

  constructor(public navCtrl: NavController, public navParams: NavParams, private API: ApiProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register() {
    console.log(this.email, this.password)
    const response = await this.API.Register(this.email, this.password)
    console.log(response);

    if (response.success === true) {
      const message = "Successfully created user. Please log in."
      this.responseToast(message)
    } else {
      this.responseToast(response.msg)
    }
  }

  async responseToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    await toast.present();
    await this.navCtrl.setRoot('LoginPage');
  }

}
