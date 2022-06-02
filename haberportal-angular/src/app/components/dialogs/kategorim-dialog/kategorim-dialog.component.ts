import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-kategorim-dialog',
  templateUrl: './kategorim-dialog.component.html',
  styleUrls: ['./kategorim-dialog.component.scss']
})
export class KategorimDialogComponent implements OnInit {

  dialogBaslik:string;
  yeniKayit:Kategori;
  islem:string;
  frm:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KategorimDialogComponent>,
    public frmBuild :FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data :any
  ) {
    this.islem=data.islem;
    if(this.islem=="ekle"){
      this.dialogBaslik="Haber Ekle";
      this.yeniKayit = new Kategori();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik="Haberi Duzenle"
      this.yeniKayit = data.kayit;

    }
    this.frm = this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      KategoriAd: [this.yeniKayit.KategoriAd]
      
    })
  };

}
