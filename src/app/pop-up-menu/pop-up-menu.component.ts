import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faBook, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pop-up-menu',
  imports: [FontAwesomeModule],
  templateUrl: './pop-up-menu.component.html',
  styleUrl: './pop-up-menu.component.css',
})
export class PopUpMenuComponent {
  readonly barsIcon = faBars;
  readonly bookIcon = faBook;
  readonly peopleArrowsIcon = faPeopleArrows;

  private _isMenuOpen: boolean = false;

  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);

  get isMenuOpen() {
    return this._isMenuOpen;
  }

  toggleMenu() {
    this._isMenuOpen = !this._isMenuOpen;
  }

  async openManageLibrary() {
    this._isMenuOpen = false;
    await this.router.navigate(['library-manage-page']);
  }

  async openManageDances() {
    this._isMenuOpen = false;
    await this.router.navigate(['dance-manage-page']);
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    if (this.isMenuOpen && !this.elementRef.nativeElement.contains(targetElement)) {
      this._isMenuOpen = false;
    }
  }
}
