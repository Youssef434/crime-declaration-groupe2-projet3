import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-officiers-list',
  templateUrl: './officiers-list.component.html',
  styleUrls: ['./officiers-list.component.css'],
})
export class OfficiersListComponent implements OnInit {
  @Input()
  Officiers: User[] = [];
  officerIndex: number = 0;
  showDetails: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showOfficierDetails(id: number) {
    this.showDetails = true;
    this.officerIndex = this.Officiers.findIndex((officier) => {
      return officier.id == id;
    });
  }

  closeDetailSection() {
    this.showDetails = false;
  }
}
