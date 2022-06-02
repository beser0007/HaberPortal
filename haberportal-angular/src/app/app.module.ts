import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { ApiService } from './services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule  } from '@angular/material/dialog';
import { MatCommonModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';







import { MaterialModule } from './material.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import { KategorimDialogComponent } from './components/dialogs/kategorim-dialog/kategorim-dialog.component';
import { HaberDialogComponent } from './components/dialogs/haber-dialog/haber-dialog.component';

import { AdminHaberComponent } from './components/admin/admin-haber/admin-haber.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HaberlerComponent } from './components/haberler/haberler.component';


















@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertDialogComponent,
    AdminKategoriComponent,
    ConfirmDialogComponent,
    KategorimDialogComponent,
    HaberDialogComponent,
    AdminHaberComponent,
    AdminUyeComponent,
    UyeDialogComponent,
    MainNavComponent,
    HaberlerComponent
    

  ],
  imports: [
    MaterialModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatSliderModule,
    MatGridListModule,
    MatStepperModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatCommonModule,
    MatInputModule,
    MatListModule
    





    


    



    










    
    
    
  ],
  providers: [MyAlertService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
