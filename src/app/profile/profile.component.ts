import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  editMode: false;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let profileName: '';
    let profileSurname: '';
    let profileEmail: '';
    let profilePhone: '';

    this.profileForm = new FormGroup({
      profileName: new FormControl(profileName, Validators.required),
      profileSurname: new FormControl(profileSurname, Validators.required),
      profileEmail: new FormControl(profileEmail, Validators.required),
      profilePhone: new FormControl(profilePhone, Validators.required)
    });
  }

}
