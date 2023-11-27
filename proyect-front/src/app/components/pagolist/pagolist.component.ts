import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { PagoService } from 'src/app/services/pagos.service';
import { PagosComponent } from '../pagos/pagos.component';

export interface IPago {
  id_pago: number;
  fk_id_usuario: number;
  fk_id_servicio: number;
  monto_pagado: number;
  fk_id_usuario_empleado: number;
  fecha: string;
  fecha_inicio_sus: string;
  fecha_fin_sus: string;
  correo_usuario: string;
  nombre_servicio: string;
}
@Component({
  selector: 'app-pagolist',
  templateUrl: './pagolist.component.html',
  styleUrls: ['./pagolist.component.scss'],
})
export class PagolistComponent {
  displayedColumns = [
    'nombre_servicio',
    'correo_usuario',
    'monto_pagado',
    'fecha',
    'fecha_inicio_sus',
    'fecha_fin_sus',
    'actions',
  ];
  listPagos: IPago[] = [];
  sortedData: IPago[] = [];
  dataSource = new MatTableDataSource<IPago>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private pagosService: PagoService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.GetPagos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private GetPagos() {
    combineLatest([this.pagosService.listPago()]).subscribe(
      (response) => {
        this.listPagos = response[0].body;
        this.sortedData = this.listPagos.slice();
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
    const data = this.listPagos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.dataSource.data = this.sortedData;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombre_servicio':
          return compare(a.nombre_servicio, b.nombre_servicio, isAsc);
        case 'correo_usuario':
          return compare(a.correo_usuario, b.correo_usuario, isAsc);
        case 'monto_pagado':
          return compare(a.monto_pagado, b.monto_pagado, isAsc);
        case 'fecha':
          return compare(a.fecha, b.fecha, isAsc);
        case 'fecha_inicio_sus':
          return compare(a.fecha_inicio_sus, b.fecha_inicio_sus, isAsc);
        case 'fecha_fin_sus':
          return compare(a.fecha_fin_sus, b.fecha_fin_sus, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.sortedData;
  }
  public onDetail(row: any): void {
    const dialogRef = this.dialog.open(PagosComponent, {
      data: {
        id: row != null ? row.id_pago : 0,
      },
      autoFocus: false,
      restoreFocus: false,
      disableClose: true,
      width: '800px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.GetPagos();
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
