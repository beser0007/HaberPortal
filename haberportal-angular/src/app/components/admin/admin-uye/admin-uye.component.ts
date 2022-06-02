import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Haber } from 'src/app/models/Haber';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.scss']
})
export class AdminUyeComponent implements OnInit {

  uye:Uye[];
  dataSource:any;
  displayedColumns=['UyeID','UyeAdSoyad','UyeMail','UyeParola','UyeYetki','UyeTarih','detay']
  dialogRef:MatDialogRef<UyeDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(
    public apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.UyeListele();
  }
  UyeListele(){
    this.apiServis.UyeListe().subscribe((d:Uye[])=>{
      this.uye=d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }
  Ekle(){
    var yeniKayit:Uye = new Uye();
    this.dialogRef=this.matDialog.open(UyeDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        
        yeniKayit.UyeAdSoyad = d.UyeAdSoyad;
        yeniKayit.UyeMail= d.UyeMail;
        yeniKayit.UyeYas= d.UyeYas;
        yeniKayit.UyeParola= d.UyeParola;
        yeniKayit.UyeYetki= d.UyeYetki;
        yeniKayit.UyeTarih= d.UyeTarih;
      
        this.apiServis.UyeEkle(d).subscribe((s:Sonuc)=>{
          console.log(d)
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UyeListele();
          }
        });
      }
    });
  }

  
   
  Sil(uye:Uye){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = uye.UyeAdSoyad + " Adlı Uye silinecektir. Onaylıyor musunuz?";
    

    this.dialogRefConfirm.afterClosed().subscribe(d =>{
      if(d){

        uye.UyeID = d.UyeID;
        // uye.UyeAdSoyad = d.UyeAdSoyad;
        // uye.UyeMail = d.UyeMail;
        // uye.UyeParola = d.UyeParola;
        // uye.UyeTarih = d.UyeTarih;
        // uye.UyeYas = d.UyeYas;
        // uye.UyeYetki = d.UyeYetki;

        
        
        this.apiServis.UyeSil(uye.UyeID).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UyeListele();
          }
        });
      } 
    
    });
  }



  Duzenle(uye:Uye){
    this.dialogRef=this.matDialog.open(UyeDialogComponent,{
      width:'400px',
      data:{
        kayit: uye,
        islem:'duzenle'
      }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){
      uye.UyeAdSoyad = d.UyeAdSoyad;
      uye.UyeMail= d.UyeMail;
      uye.UyeParola= d.UyeParola;
      uye.UyeTarih= d.UyeTarih;
      uye.UyeYas= d.UyeYas;
      uye.UyeYetki= d.UyeYetki;
      this.apiServis.UyeDuzenle(uye).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.UyeListele();
        }
      });
    } 
    });
  }


   
  

}
