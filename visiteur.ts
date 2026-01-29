import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../popup/popup';  

@Component({
  selector: 'app-visiteur',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PopupComponent   
  ],
  templateUrl: './visiteur.html',
  styleUrls: ['./visiteur.scss']
})
export class VisiteurComponent {
  showPopup = false;
  editMode = false;
  selectedIndex: number | null = null;

  pageSize = 10;
  currentPage = 1;

  searchTerm: string = '';

  sortField: string = 'creneau';  
  sortDirection: 'asc' | 'desc' = 'asc';

  get totalPages(): number {
    return Math.ceil(this.visiteurs.length / this.pageSize);
  }

  selectedVisiteur: any = {
    nom: '',
    creneau: '',
    status: 'en attente',
    profil: 'Entrant',
    localisation: 'En route',
    expeditions: '',
    phone: '',
    plate: '',
    carrier: 'Camion',   
    goods: 'Biens normales',
    tracking: ''
  };

  visiteurs = [
    { nom: 'Expédition 5684236526', creneau: '+50 min', status: 'en attente', statusClass: 'status en-attente', profil: 'Sortant', profilClass: 'profil sortant', localisation: 'En route' },
    { nom: 'Expédition 5684236527', creneau: '', status: 'Vérifié', statusClass: 'status verifie', profil: 'Entrant', profilClass: 'profil entrant', localisation: 'Sur site' },
    { nom: 'Expédition 5684236528', creneau: '', status: 'Parti', statusClass: 'status parti', profil: 'Entrant', profilClass: 'profil entrant', localisation: 'En route' },
    { nom: 'Expédition 5684236529', creneau: '-2 min', status: 'en attente', statusClass: 'status en-attente', profil: 'Entrant', profilClass: 'profil entrant', localisation: 'Sur site' },
    { nom: 'Expédition 5684236530', creneau: '+15 min', status: 'Expecté', statusClass: 'status expecte', profil: 'Sortant', profilClass: 'profil sortant', localisation: 'En route' },
    { nom: 'Expédition 5684236531', creneau: '', status: 'Vérifié', statusClass: 'status verifie', profil: 'Sortant', profilClass: 'profil sortant', localisation: 'Sur site' },
    { nom: 'Expédition 5684236532', creneau: '', status: 'Parti', statusClass: 'status parti', profil: 'Sortant', profilClass: 'profil sortant', localisation: 'En route' },
    { nom: 'Expédition 5684236533', creneau: '+20 min', status: 'Expecté', statusClass: 'status expecte', profil: 'Entrant', profilClass: 'profil entrant', localisation: 'En route' },
  ];


  get filteredVisiteurs() {
    return this.visiteurs
      .filter(v => v.nom.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .sort((a, b) => this.compare(a, b));
  }


  compare(a: any, b: any): number {
    let valA: any;
    let valB: any;

    if (this.sortField === 'creneau') {
      valA = this.parseCreneau(a.creneau);
      valB = this.parseCreneau(b.creneau);
    } else {
      valA = (a[this.sortField] || '').toString().toLowerCase();
      valB = (b[this.sortField] || '').toString().toLowerCase();
    }

    if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;
  }

  
  parseCreneau(value: string): number {
    if (!value) return 9999; 
    const match = value.match(/([+-]?\s*\d+)\s*min/);
    return match ? parseInt(match[1].replace(/\s+/g, ''), 10) : 9999;
  }


  setSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  addNewVisiteur(item: any) {
    if (this.editMode && this.selectedIndex !== null) {
      this.visiteurs[this.selectedIndex] = item;
    } else {
      this.visiteurs = [item, ...this.visiteurs];
      this.currentPage = Math.ceil(this.visiteurs.length / this.pageSize);
    }
    this.showPopup = false;
    this.editMode = false;
    this.selectedIndex = null;
    this.resetSelected();
  }

  openPopupFromRow(item: any, index: number) {
    this.selectedVisiteur = { ...item };
    this.showPopup = true;
    this.editMode = true;
    this.selectedIndex = index;
  }

  resetSelected() {
    this.selectedVisiteur = {
      nom: '',
      creneau: '',
      status: 'en attente',
      profil: 'Entrant',
      localisation: 'En route',
      expeditions: '',
      phone: '',
      plate: '',
      carrier: 'Camion',   
      goods: 'Biens normales',
      tracking: ''
    };
  }

  deleteVisitor(index: number) {
    if (confirm('Voulez-vous vraiment supprimer ce visiteur ?')) {
      this.visiteurs.splice(index, 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}