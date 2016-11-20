import { Component, OnInit } from '@angular/core';
import { PouleService } from './poule.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private time_ouverture;
  private time_fermeture;
  constructor(private pouleService:PouleService) { }

  ngOnInit() {
    this.time_ouverture = this.pouleService.getTimingOuverture();
    this.time_fermeture = this.pouleService.getTimingFermeture();
  }
  onSave(){
    this.pouleService.saveTiming(this.time_ouverture,this.time_fermeture);
  }
}
