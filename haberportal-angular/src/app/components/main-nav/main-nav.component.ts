import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Haber } from 'src/app/models/Haber';
import { Kategori } from 'src/app/models/Kategori';
import { Uye } from 'src/app/models/Uye';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  uyeAdSoyad:string;
  kategoriler:Kategori[];
  UyeId = localStorage.getItem("uyeid")
  uye: Uye;
  haberler:Haber[];

  uyeler:Uye[];
  dataSource:any;
  displayedColumns=['UyeId','UyeAdSoyad','UyeEposta','UyeParola','UyeYetki','detay']
  dialogRef:MatDialogRef<UyeDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis:ApiService,
    public route:ActivatedRoute,
    public matDialog : MatDialog,
    public alert: MyAlertService
  
    ) {}
  ngOnInit(): void {
    this.KategoriListele();
    if(this.apiServis.oturumKontrol){
      this.uyeAdSoyad= localStorage.getItem("uyeAdSoyad");
    }
    this.UyeListele();

    
  }
  OturumKapat(){
    localStorage.clear();
    location.href="/";
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
      
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
        
        
        yeniKayit.UyeYetki= d.UyeYetki;
      
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

  UyeListele(){
    this.apiServis.UyeListe().subscribe((d:Uye[])=>{
      this.uyeler=d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }
}
