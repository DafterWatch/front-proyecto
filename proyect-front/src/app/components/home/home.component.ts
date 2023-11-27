import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { combineLatest } from 'rxjs';
import { NoticiasService } from 'src/app/services/noticias.service';
export interface INoticia {
  id_noticia: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  pageSize = 9;
  pageIndex = 0;
  listNoticias: INoticia[] = [];
  selectedNoticia: any;
  modalOpen = false;
  toggleModal(noticia: any) {
    this.modalOpen = !this.modalOpen;
    this.selectedNoticia = noticia;
  }
  constructor(private noticiasService: NoticiasService) {}
  ngOnInit() {
    this.paginator.pageSize = this.pageSize;
    this.GetNoticias();
  }
  private GetNoticias() {
    combineLatest([this.noticiasService.listNoticia()]).subscribe(
      (response) => {
        this.listNoticias = response[0].body.Noticias;
        this.listNoticias = this.listNoticias.sort(
          (a, b) => b.id_noticia - a.id_noticia
        );
      }
    );
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
  }
  getRange() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return { startIndex, endIndex };
  }
}
