import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Haber } from 'src/app/models/Haber';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { HaberDialogComponent } from '../dialogs/haber-dialog/haber-dialog.component';
import { KategorimDialogComponent } from '../dialogs/kategorim-dialog/kategorim-dialog.component';

@Component({
  selector: 'app-haberler',
  templateUrl: './haberler.component.html',
  styleUrls: ['./haberler.component.scss']
})
export class HaberlerComponent implements OnInit {

  haberler:Haber[];
  haber:Haber[];
  dataSource:any;
  kategoriler:Kategori[];
  KategoriId:number;
  dialogRef:MatDialogRef<HaberDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  hidden = false;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  constructor(
    public  apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService,
    public route : ActivatedRoute

  ) { }

  ngOnInit() {
    this.HaberListe();
    this.KategoriListele();
  }

  HaberListe(){
    this.apiServis.HaberListe().subscribe((d:Haber[])=>{
      this.haberler=d;
      console.log(d)
    });
  }

  Haberler(){
    this.apiServis.HaberListe().subscribe((d:Haber[])=>{
      this.haberler;
    })
  }


  
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
      

    });
  }

}


