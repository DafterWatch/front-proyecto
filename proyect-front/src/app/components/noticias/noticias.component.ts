import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { NoticiasService } from 'src/app/services/noticias.service';
import { NoticiasformularioComponent } from '../noticiasformulario/noticiasformulario.component';

export interface INoticia {
  id_noticia: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: string;
}

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit, AfterViewInit {
  displayedColumns = ['titulo', 'descripcion', 'fecha', 'actions'];
  listNoticias: INoticia[] = [];
  sortedData: INoticia[] = [];
  dataSource = new MatTableDataSource<INoticia>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private noticiasService: NoticiasService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.GetNoticias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private GetNoticias() {
    combineLatest([this.noticiasService.listNoticia()]).subscribe(
      (response) => {
        this.listNoticias = response[0].body.Noticias;
        this.sortedData = this.listNoticias.slice();
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
    const data = this.listNoticias.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.dataSource.data = this.sortedData;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'titulo':
          return compare(a.titulo, b.titulo, isAsc);
        case 'descripcion':
          return compare(a.descripcion, b.descripcion, isAsc);
        case 'fecha':
          return compare(a.fecha, b.fecha, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.sortedData;
  }
  public onDetail(row: any): void {
    const dialogRef = this.dialog.open(NoticiasformularioComponent, {
      data: {
        id: row != null ? row.id_noticia : 0,
      },
      autoFocus: false,
      restoreFocus: false,
      disableClose: true,
      width: '800px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.GetNoticias();
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
