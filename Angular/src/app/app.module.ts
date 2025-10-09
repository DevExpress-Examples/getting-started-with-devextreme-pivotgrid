import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxPivotGridModule } from 'devextreme-angular/ui/pivot-grid';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxPivotGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
