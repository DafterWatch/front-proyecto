import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { ServicioService } from 'src/app/services/servicios.service';
import { ServicioformularioComponent } from '../servicioformulario/servicioformulario.component';
export interface IServicio {
  id_servicio: number;
  nombre: string;
  precio: number;
}
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent {
  displayedColumns = ['nombre', 'precio', 'actions'];
  listServicios: IServicio[] = [];
  sortedData: IServicio[] = [];
  dataSource = new MatTableDataSource<IServicio>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private serviciosService: ServicioService,
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
    combineLatest([this.serviciosService.listServicio()]).subscribe(
      (response) => {
        this.listServicios = response[0].body.Servicios;
        this.sortedData = this.listServicios.slice();
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
    const data = this.listServicios.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.dataSource.data = this.sortedData;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombre':
          return compare(a.nombre, b.nombre, isAsc);
        case 'precio':
          return compare(a.precio, b.precio, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.sortedData;
  }
  public onDetail(row: any): void {
    const dialogRef = this.dialog.open(ServicioformularioComponent, {
      data: {
        id: row != null ? row.id_servicio : 0,
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
