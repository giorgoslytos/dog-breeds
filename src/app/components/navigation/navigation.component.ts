import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  navLinks = [
    { title: 'Home', path: '/home', icon: 'home' },
    { title: 'Breeds', path: '/breeds', icon: 'pets' },
    { title: 'Favorites', path: '/favorites', icon: 'favorite' },
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
