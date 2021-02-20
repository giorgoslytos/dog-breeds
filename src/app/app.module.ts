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
import { SocialModalComponent } from './components/social-modal/social-modal.component';
import { FavoritesService } from './services/favorites.service';
import { BreedsPageComponent } from './pages/breeds-page/breeds-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DogApiService } from './services/dog-api.service';
import { GetBreedNamePipe } from './pipes/get-breed-name.pipe';
import { ModalComponent } from './components/modal/modal.component';
@NgModule({
  declarations: [
    AppComponent,
    DogCardComponent,
    NavigationComponent,
    HomePageComponent,
    FavoritesPageComponent,
    DogFromUrlComponent,
    SocialModalComponent,
    BreedsPageComponent,
    GetBreedNamePipe,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [CookieService, FavoritesService, DogApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
