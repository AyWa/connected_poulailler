import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { user_profile, ProfilService } from '../../service_utilisateurs/profil.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  @Input() close: Function;
  private my_user : user_profile;
  constructor(private formBuilder: FormBuilder,private profilService: ProfilService) { }

  ngOnInit() {
    this.my_user=this.profilService.getProfile();
    this.editForm = this.formBuilder.group({
      profile: this.formBuilder.group({
        firstName: [this.my_user.firstName, Validators.required],
        lastName: [this.my_user.lastName, Validators.required],
        city: [this.my_user.city],
        phone: [this.my_user.phone]
      })
    });
  }
  onSave(newUser){
    console.log(newUser);
    if(this.profilService.edit_profile(newUser)){
      console.log('close popup');
      this.close();
        //close the popup
    }
    //else reset field
  }

}
