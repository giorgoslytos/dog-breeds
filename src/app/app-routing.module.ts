import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogFromUrlComponent } from './pages/dog-from-url/dog-from-url.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'breeds', component: HomePageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'dog/:id', component: DogFromUrlComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
