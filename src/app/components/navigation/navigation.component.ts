import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnDestroy, AfterViewChecked {
  @ViewChild('toolbar', { read: ElementRef })
  toolbar: ElementRef | undefined;
  @ViewChild('footer', { read: ElementRef })
  footer: ElementRef | undefined;
  drawerHeight: string = '100%';
  mainContentHeight: string = '100%';
  mobileQuery: MediaQueryList;

  navLinks = [
    { title: 'Home', path: '/home', icon: 'home' },
    { title: 'Breeds', path: '/breeds', icon: 'pets' },
    { title: 'Favorites', path: '/favorites', icon: 'pets' },
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

  ngAfterViewChecked(): void {
    this.drawerHeight = `calc(100vh - ${this.toolbar?.nativeElement.offsetHeight}px`;
    this.mainContentHeight = `calc(100vh - ${
      this.toolbar?.nativeElement.offsetHeight +
      this.footer?.nativeElement.offsetHeight
    }px`;
  }
}
