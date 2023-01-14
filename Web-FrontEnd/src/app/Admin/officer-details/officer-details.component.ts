import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-officer-details',
  templateUrl: './officer-details.component.html',
  styleUrls: ['./officer-details.component.css'],
})
export class OfficerDetailsComponent implements OnInit {
  @Input()
  officier?: User;
  constructor() {}

  ngOnInit(): void {}
}
