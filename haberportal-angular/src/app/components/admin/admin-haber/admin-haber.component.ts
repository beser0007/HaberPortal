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
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { HaberDialogComponent } from '../../dialogs/haber-dialog/haber-dialog.component';

@Component({
  selector: 'app-admin-haber',
  templateUrl: './admin-haber.component.html',
  styleUrls: ['./admin-haber.component.scss']
})
export class AdminHaberComponent implements OnInit {

  haberler:Haber[];
  kategoriler:Kategori[];
  KategoriId:number;
  dataSource:any;
  displayedColumns=['HaberBaslik','HaberIcerik','HaberTarih','HaberFoto','HaberUyeId','HaberKatId','detay']
  dialogRef:MatDialogRef<HaberDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(
    public apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService,
    public route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.KategoriListele();
    this.route.params.subscribe(p=>{
      if(p.KategoriId){
        this.KategoriId = p.KategoriId;
        console.log(this.KategoriId)
        this.HaberListele();
        
      }
      
    });
  }

  HaberListele(){
    this.apiServis.HaberListeleByKatId(this.KategoriId).subscribe((d:Haber[])=>{
      this.haberler=d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.haberler)

    });
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
      

    });
  }

  



  Duzenle(haberler:Haber){
    this.dialogRef=this.matDialog.open(HaberDialogComponent,{
      width:'1000px',
      data:{
        kayit: haberler,
        islem:'duzenle'
      }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){
      haberler.HaberBaslik = d.HaberBaslik;
      haberler.HaberFoto = d.HaberFoto;
      haberler.HaberIcerik = d.HaberIcerik;
      haberler.HaberKatId = d.HaberKatId;
      haberler.HaberTarih = d.HaberTarih;

      this.apiServis.HaberDuzenle(haberler).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.HaberListele();
        }
      });
    } 
    });
  }

  Detay(haberler:Haber){
    this.dialogRef=this.matDialog.open(HaberDialogComponent,{
      width:'1000px',
      data:{
        kayit: haberler,
        islem:'detay'
      }
  });
  
  }
  
  
  
  Ekle(){
    var yeniKayit:Haber = new Haber();
    this.dialogRef=this.matDialog.open(HaberDialogComponent,{
      width:'1000px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        
        yeniKayit.HaberBaslik= d.HaberBaslik;
        yeniKayit.HaberKatId = d.HaberKatId;
        yeniKayit.HaberIcerik = d.HaberIcerik;
        yeniKayit.HaberKatId = d.HaberKatId;
        yeniKayit.HaberTarih = d.HaberTarih;
        yeniKayit.HaberUyeId = d.HaberUyeId;
        this.apiServis.HaberEkle(d).subscribe((s:Sonuc)=>{
          console.log(d)
          this.alert.AlertUygula(s);
          if(s.islem){
            this.HaberListele();
          }
        });
      }
    });
  }

  Sil(haberler:Haber){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = haberler.HaberBaslik + " Adlı Haber silinecektir. Onaylıyor musunuz?";
  
    this.dialogRefConfirm.afterClosed().subscribe(d =>{
      if(d){

        haberler.HaberBaslik = d.HaberBaslik;
        haberler.HaberFoto = d.HaberFoto;
        haberler.HaberIcerik = d.HaberIcerik;
        haberler.HaberKatId = d.HaberKatId;
        haberler.HaberTarih = d.HaberTarih;
        haberler.HaberUyeId = d.HaberUyeId;

        this.apiServis.HaberSil(haberler.HaberId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.HaberListele();
          }
        });
      } 
    
    });
  }

}
