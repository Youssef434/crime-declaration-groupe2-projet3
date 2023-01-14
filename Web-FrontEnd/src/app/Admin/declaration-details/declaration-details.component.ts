import { Component, Input, OnInit } from '@angular/core';
import { Declaration } from 'src/app/model/declaration/declaration';

@Component({
  selector: 'app-declaration-details',
  templateUrl: './declaration-details.component.html',
  styleUrls: ['./declaration-details.component.css'],
})
export class DeclarationDetailsComponent implements OnInit {
  @Input()
  declaration!: Declaration;
  constructor() {}

  ngOnInit(): void {}
}
