import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DataService } from '../../../shared/services/data.service';
import { MoviesManagementComponent } from '../movies-management/movies-management.component';

@Component({
  selector: 'app-theatre-managemnent',
  templateUrl: './theatre-managemnent.component.html',
  styleUrls: ['./theatre-managemnent.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TheatreManagemnentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'seats', 'city', 'address' , 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.dataService.theatresList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Search Dialog
   */
  moviesManageDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.id = 'moviesManageDialog';
    dialogConfig.data = row;
    dialogConfig.position = {
      top: '0',
      left: '0'
    };
    dialogConfig.closeOnNavigation = true;
    this.dialog.open(MoviesManagementComponent, dialogConfig);
  }
}
