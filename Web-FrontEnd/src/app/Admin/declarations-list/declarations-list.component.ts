import { Component, Input, OnInit } from '@angular/core';
import { Declaration } from 'src/app/model/declaration/declaration';

@Component({
  selector: 'app-declarations-list',
  templateUrl: './declarations-list.component.html',
  styleUrls: ['./declarations-list.component.css'],
})
export class DeclarationsListComponent implements OnInit {
  @Input()
  declarations: Declaration[] = [];
  showDetails: boolean = false;
  idDeclaration: number = 1;
  constructor() {}

  ngOnInit(): void {}
  chooseDeclaration(id: number) {
    this.showDetails = true;
    this.idDeclaration = id;
  }
}
