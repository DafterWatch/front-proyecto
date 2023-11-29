import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { RutinaService } from 'src/app/services/rutinas.service';
import { RutinasformularioComponent } from '../rutinasformulario/rutinasformulario.component';

export interface IRutinas {
  id_rutina: number;
  imagen: string;
  titulo: string;
  repeticiones: string;
  descripcion: string;
  instrucciones: string;
  video: string;
  id_rutina_grupo: number;
}
@Component({
  selector: 'app-rutinainterfaz',
  templateUrl: './rutinainterfaz.component.html',
  styleUrls: ['./rutinainterfaz.component.scss'],
})
export class RutinainterfazComponent {
  displayedColumns = [
    'titulo',
    'descripcion',
    'instrucciones',
    'repeticiones',
    'imagen',
    'video',
    'actions',
  ];
  listRutinas: IRutinas[] = [];
  sortedData: IRutinas[] = [];
  dataSource = new MatTableDataSource<IRutinas>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private rutinasService: RutinaService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.GetServicios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private GetServicios() {
    combineLatest([this.rutinasService.listRutinas()]).subscribe((response) => {
      this.listRutinas = response[0].body.Rutinas;
      this.sortedData = this.listRutinas.slice();
      this.dataSource.data = this.sortedData;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sortData(sort: Sort) {
    const data = this.listRutinas.slice();
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
        case 'instrucciones':
          return compare(a.instrucciones, b.instrucciones, isAsc);
        case 'repeticiones':
          return compare(a.repeticiones, b.repeticiones, isAsc);
        case 'imagen':
          return compare(a.imagen, b.imagen, isAsc);
        case 'video':
          return compare(a.video, b.video, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.sortedData;
  }
  public onDetail(row: any): void {
    const dialogRef = this.dialog.open(RutinasformularioComponent, {
      data: {
        id: row != null ? row.id_rutina : 0,
      },
      autoFocus: false,
      restoreFocus: false,
      disableClose: true,
      width: '800px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.GetServicios();
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
