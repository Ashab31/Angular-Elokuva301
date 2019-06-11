import { Component, OnInit, Input } from '@angular/core';

import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    public utils: UtilsService
  ) { }

  ngOnInit() {
  }

}
