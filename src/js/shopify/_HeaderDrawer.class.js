import { MenuDrawer } from './_MenuDrawer.class'

export class HeaderDrawer extends MenuDrawer {
  constructor() {
    super()
  }

  openMenuDrawer(summaryElement) {
    this.header =
      this.header || document.getElementById('shopify-section-header')
    this.borderOffset =
      this.borderOffset ||
      this.closest('.header-wrapper').classList.contains(
        'header-wrapper--border-bottom'
      )
        ? 1
        : 0
    document.documentElement.style.setProperty(
      '--header-bottom-position',
      `${parseInt(
        this.header.getBoundingClientRect().bottom - this.borderOffset
      )}px`
    )
    this.header.classList.add('menu-open')

    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening')
    })

    summaryElement.setAttribute('aria-expanded', true)
    trapFocus(this.mainDetailsToggle, summaryElement)
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`)
  }

  closeMenuDrawer(event, elementToFocus) {
    super.closeMenuDrawer(event, elementToFocus)
    this.header.classList.remove('menu-open')
  }
}

customElements.define('header-drawer', HeaderDrawer)
