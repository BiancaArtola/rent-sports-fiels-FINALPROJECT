import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FirebaseAuth } from 'src/services/FirebaseAuth';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  private resetPasswordForm: FormGroup;
  private emailModel;

  constructor(private modalController: ModalController, private firebaseAuth: FirebaseAuth,
    private alertController: AlertController, public formBuilder: FormBuilder) {
    this.resetPasswordForm = this.createForm();
  }


  createForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  resetPassword() {
    this.firebaseAuth.resetPassword(this.resetPasswordForm.value.email).then(() => {
      this.emailModel = null;
      this.showMessage("Revise su correo", "Se ha enviado un email para recuperar su contraseña.")
    })
    .catch((error)=>{
      this.showMessage("Este usuario no existe.", "Por favor, revise el email que ha ingresado.");      
    })
    ;
  }

  async showMessage(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}