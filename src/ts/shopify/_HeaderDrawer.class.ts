import { MenuDrawer } from './_MenuDrawer.class'

export class HeaderDrawer extends MenuDrawer {
  borderOffset: any;
  header: any;
  mainDetailsToggle: any;
  constructor() {
    super();
  }

  openMenuDrawer(summaryElement: any) {
    this.header = this.header || document.getElementById('shopify-section-header');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    this.borderOffset = this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
    // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    document.documentElement.style.setProperty('--header-bottom-position', `${parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)}px`);
    this.header.classList.add('menu-open');

    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });

    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event: any, elementToFocus: any) {
    super.closeMenuDrawer(event, elementToFocus);
    this.header.classList.remove('menu-open');
  }
}

customElements.define('header-drawer', HeaderDrawer);
