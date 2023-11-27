import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioformularioComponent } from '../usuarioformulario/usuarioformulario.component';

export interface IUsuario {
  id_persona: number;
  primernombre: string;
  segundonombre: string;
  paterno: string;
  materno: string;
  ci: string;
  celular: number;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'nombres',
    'ci',
    'celular',
    'actions',
  ];
  listUsers: IUsuario[] = [];
  sortedData: IUsuario[] = [];
  dataSource = new MatTableDataSource<IUsuario>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.GetUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private GetUsers() {
    combineLatest([this.usuarioService.listUsuarios()]).subscribe(
      (response) => {
        this.listUsers = response[0].body.Personas;
        this.sortedData = this.listUsers.slice();
        this.dataSource.data = this.sortedData;
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sortData(sort: Sort) {
    const data = this.listUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.dataSource.data = this.sortedData;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombres':
          return compare(a.primernombre, b.primernombre, isAsc);
        case 'ci':
          return compare(a.ci, b.ci, isAsc);
        case 'celular':
          return compare(a.celular, b.celular, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.sortedData;
  }
  public onDetail(row: any): void {
    const dialogRef = this.dialog.open(UsuarioformularioComponent, {
        data: {
            id: row != null ? row.id_persona : 0,
        },
        autoFocus: false,
        restoreFocus: false,
        disableClose: true,
        width: '800px',
    });
    dialogRef.afterClosed().subscribe((res) => {
        this.GetUsers();
    });
}
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
