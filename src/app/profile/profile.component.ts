import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase  from 'firebase/app';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  editMode: false;
  user: User;

  constructor(
    public authService: AuthService,
    public afStore: AngularFirestore,
    public afAuth: AngularFireAuth
    ) {}

  ngOnInit() {
    this.initForm();

    this.authService.user$.subscribe(
      user => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      } 
    )
    console.log(firebase.auth().currentUser.uid)
  }

  private initForm() {
    let profileName: '';

    this.profileForm = new FormGroup({
      profileName: new FormControl(profileName, Validators.required)
    });
  }

  onSubmit(form: FormGroup) {
    const value = form.value;
    const displayName = value.profileName;
    const email = firebase.auth().currentUser.email;
    const uid = firebase.auth().currentUser.uid;
    console.log(uid)
    const storedUser = new User(
      email, uid, displayName
    );
    this.authService.updateUserData(storedUser);
  }

}
