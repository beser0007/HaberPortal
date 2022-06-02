import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Haber } from '../models/Haber';
import { Kategori } from '../models/Kategori';
import { Uye } from '../models/Uye';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl="http://localhost:64649/api/";
  constructor(
    public http : HttpClient
  ) { }

  tokenAl(UyeMail: string, Uyeparola: string){
    var data = "username=" + UyeMail + "&password=" + Uyeparola + "&grant_type=password";
    var reqHeader = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl + "token", data, { headers: reqHeader});
  
  }
  oturumKontrol(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  yetkiKontrol(yetkiler){
    var sonuc : boolean = false;

    var uyeYetkiler :string[] = JSON.parse(localStorage.getItem("uyeYetki"))

    if(uyeYetkiler){
      yetkiler.forEach(element => {
        if(uyeYetkiler.indexOf(element)>-1){
          sonuc = true;
          return false;

        }
      });
    }

    return sonuc;
  }


  KategoriListe(){
    return this.http.get(this.apiUrl+ "/kategoriliste");
  }
  KategoriById(KategoriId:number){
    return this.http.get(this.apiUrl+ "/kategoribyid/"+ KategoriId);
  }
  KategoriEkle(kat:Kategori){
    return this.http.post(this.apiUrl+ "/kategoriekle",kat);
    
  }
  KategoriDuzenle(kat:Kategori){
    return this.http.put(this.apiUrl+ "/kategoriduzenle",kat);
  }
  KategoriSil(KategoriId:number){
    return this.http.delete(this.apiUrl+ "/kategorisil/"+KategoriId);
  }


  HaberListe(){
    return this.http.get(this.apiUrl+ "/haberlistele");
  }
  HaberListeleByKatId(HaberId:number){
    return this.http.get(this.apiUrl+ "/haberlistelebykatid/"+ HaberId);
  }
  
  HaberEkle(haber:Haber){
    return this.http.post(this.apiUrl+ "/haberekle",haber);
    
  }
  HaberDuzenle(haber:Haber){
    return this.http.put(this.apiUrl+ "/haberduzenle",haber);
  }
  HaberSil(HaberId:number){
    return this.http.delete(this.apiUrl+ "/habersil/"+HaberId);
  }


  UyeListe(){
    return this.http.get(this.apiUrl+ "/uyelistele")
  }
  UyeById(UyeID:number){
    return this.http.get(this.apiUrl+ "/uyebyid/" + UyeID)
  }
  UyeEkle(uye:Uye){
    return this.http.post(this.apiUrl+ "/uyeekle",uye)
  }
  UyeSil(UyeID:number){
    return this.http.delete(this.apiUrl+ "/uyesil/" + UyeID)
  }
  UyeDuzenle(uye:Uye){
    return this.http.put(this.apiUrl+ "/uyeduzenle",uye);
  }



}
