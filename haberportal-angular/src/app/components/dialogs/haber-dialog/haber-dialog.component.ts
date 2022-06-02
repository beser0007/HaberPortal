import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Haber } from 'src/app/models/Haber';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-haber-dialog',
  templateUrl: './haber-dialog.component.html',
  styleUrls: ['./haber-dialog.component.scss']
})
export class HaberDialogComponent implements OnInit {

  dialogBaslik:string;
  yeniKayit:Haber;
  islem:string;
  frm:FormGroup;
  kategoriler:Kategori[];
  
  constructor(
    public dialogRef: MatDialogRef<HaberDialogComponent>,
    public frmBuild :FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data :any,
    public apiServis : ApiService
  ) {
    this.islem=data.islem;
    if(this.islem=="ekle"){
      this.dialogBaslik="haber Ekle";
      this.yeniKayit = new Haber();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik="haber Duzenle"
      this.yeniKayit = data.kayit;

    }
    if(this.islem=="detay"){
      this.dialogBaslik="Haber Detay"
      this.yeniKayit = data.kayit;

    }
    this.frm = this.FormOlustur();
   }

  ngOnInit() {
    this.KategoriListele();
  }

  FormOlustur(){
    return this.frmBuild.group({
      HaberBaslik: [this.yeniKayit.HaberBaslik],
      HaberFoto: [this.yeniKayit.HaberFoto],
      HaberIcerik: [this.yeniKayit.HaberIcerik],
      HaberKatId: [this.yeniKayit.HaberKatId],
      HaberTarih: [this.yeniKayit.HaberTarih],
      HaberUyeId: [this.yeniKayit.HaberUyeId],
    })
  };

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
      

    });
  }

}
