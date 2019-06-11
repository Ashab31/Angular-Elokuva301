import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/auth.service';
import { MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-unauthorized-user',
  templateUrl: './unauthorized-user.component.html',
  styleUrls: ['./unauthorized-user.component.scss']
})
export class UnauthorizedUserComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    public dialogRef: MatDialogRef<UnauthorizedUserComponent>
  ) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(res => {
      this.dialogRef.close();
    });
  }

}
