import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHaberComponent } from './components/admin/admin-haber/admin-haber.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { HaberlerComponent } from './components/haberler/haberler.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: '',
    component : HomeComponent

  },
  {
    path: 'login',
    component : LoginComponent

  },
  {
    path: 'admin/kategori',
    component : AdminKategoriComponent

  },
  {
    path: 'admin/haberler',
    component : AdminHaberComponent

  },
  {
    path: 'admin/uyeler',
    component : AdminUyeComponent

  },
  {
    path: 'haberler',
    component : HaberlerComponent

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
