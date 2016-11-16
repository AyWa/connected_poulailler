import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../service_utilisateurs/profil.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private time_ouverture;
  private time_fermeture;
  constructor(private profilService: ProfilService) { }

  ngOnInit() {
    this.time_ouverture = {hour: 13, minute: 30};
    this.time_fermeture= {hour: 18, minute: 30};
  }
}
