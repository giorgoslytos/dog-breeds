import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { BreedsPageComponent } from './pages/breeds-page/breeds-page.component';
import { DogFromUrlComponent } from './pages/dog-from-url/dog-from-url.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'breeds', component: BreedsPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'dog/:id', component: DogFromUrlComponent },
  { path: 'modal', component: ModalComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
