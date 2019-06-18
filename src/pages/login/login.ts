import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private API: ApiProvider, private storage: Storage, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login() {
    console.log(this.email, this.password);
    const response = await this.API.Authenticate(this.email, this.password);
    console.log(response);
    if (response.error) {
      const toast = this.toastCtrl.create({
        message: "Error logging in. Please try again.",
        duration: 3000
      });
      await toast.present();
    
    } else {
      console.log(response.token);
      await this.storage.set('jwt', response.token);
      await this.storage.set('userid', response.userid)
      await this.navCtrl.setRoot('HomescreenPage')
    }

  }

  async registerMove() {
    this.navCtrl.setRoot('RegisterPage')
  }

}
