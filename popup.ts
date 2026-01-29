import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [FormsModule, CommonModule],         
  templateUrl: './popup.html',
  styleUrls: ['./popup.scss']
})
export class PopupComponent {
  @Input() form: any = {
    nom: '',
    creneau: '',
    status: 'en attente',
    profil: 'Entrant',
    localisation: 'En route',
    expeditions: '',
    phone: '',
    plate: '',
    carrier: 'Autre',
    goods: 'Biens normales',
    tracking: ''
  };
  @Output() addVisiteur = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();
  private statusMap: Record<string, string> = {
    'en attente': 'en-attente',
    'Vérifié': 'verifie',
    'Parti': 'parti',
    'Expecté': 'expecte'
  };
  private profilMap: Record<string, string> = {
    'Entrant': 'entrant',
    'Sortant': 'sortant'
  };
  enregistrer() {
    if (!this.form.nom.match(/^\d{10}$/)) {
      alert('Le numéro d’expédition doit contenir exactement 10 chiffres.');
      return;
    }
    const newItem = {
      ...this.form,
      nom: `Expédition ${this.form.nom}`,
      statusClass: `status ${this.statusMap[this.form.status]}`,
      profilClass: `profil ${this.profilMap[this.form.profil]}`
    };
    this.addVisiteur.emit(newItem);
    this.form = {
      nom: '',
      creneau: '',
      status: 'en attente',
      profil: 'Entrant',
      localisation: 'En route',
      expeditions: '',
      phone: '',
      plate: '',
      carrier: 'Autre',
      goods: 'Biens normales',
      tracking: ''
    };
    this.close();
  }
  close() {
    this.closePopup.emit();
  }
}