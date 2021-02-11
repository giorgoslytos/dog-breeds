import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DogCardComponent } from './components/dog-card/dog-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CookieService } from 'ngx-cookie-service';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { DogFromUrlComponent } from './pages/dog-from-url/dog-from-url.component';

@NgModule({
  declarations: [
    AppComponent,
    DogCardComponent,
    NavigationComponent,
    HomePageComponent,
    FavoritesPageComponent,
    DogFromUrlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
