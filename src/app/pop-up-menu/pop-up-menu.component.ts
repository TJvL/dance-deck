import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pop-up-menu',
  imports: [FontAwesomeModule],
  templateUrl: './pop-up-menu.component.html',
  styleUrl: './pop-up-menu.component.css',
})
export class PopUpMenuComponent {
  private _isMenuOpen: boolean = false;

  private readonly faIconLibrary = inject(FaIconLibrary);
  private readonly elementRef = inject(ElementRef);

  constructor() {
    this.faIconLibrary.addIcons(faBars, faBook);
  }

  get isMenuOpen() {
    return this._isMenuOpen;
  }

  toggleMenu() {
    this._isMenuOpen = !this._isMenuOpen;
  }

  openManageLibrary() {
    this._isMenuOpen = false;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    if (this.isMenuOpen && !this.elementRef.nativeElement.contains(targetElement)) {
      this._isMenuOpen = false;
    }
  }
}
