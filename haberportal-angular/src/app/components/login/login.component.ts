import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public ApiServis:ApiService,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
  }

  OturumAc(UyeMail:string, Uyeparola:string){
    this.ApiServis.tokenAl(UyeMail, Uyeparola).subscribe((d: any) =>{
      console.log(d);
      var s: Sonuc = new Sonuc();
      s.islem=true;
      console.log(s)
      s.mesaj="Giriş Yapıldı"
      this.alert.AlertUygula(s);

      localStorage.setItem("token",d.access_token);
      localStorage.setItem("UyeID",d.UyeID);
      localStorage.setItem("mail",d.UyeMail);
      localStorage.setItem("uyeAdSoyad",d.uyeAdSoyad);
      localStorage.setItem("uyeYetki",d.uyeYetkileri);


      
      location.href="/";
      

      



    },err =>{
      var s: Sonuc = new Sonuc();
      s.islem=false;
      console.log(s)
      s.mesaj="E-posta & parola hatalı"
      this.alert.AlertUygula(s);
    }
    );
  }

}
