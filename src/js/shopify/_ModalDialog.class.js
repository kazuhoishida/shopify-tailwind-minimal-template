export class ModalDialog extends HTMLElement {
  constructor() {
    super()
    this.querySelector('[id^="ModalClose-"]').addEventListener(
      'click',
      this.hide.bind(this)
    )
    this.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide()
    })
    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (
          event.pointerType === 'mouse' &&
          !event.target.closest('deferred-media, product-model')
        )
          this.hide()
      })
    } else {
      this.addEventListener('click', (event) => {
        if (event.target.nodeName === 'MODAL-DIALOG') this.hide()
      })
    }
  }

  connectedCallback() {
    if (this.moved) return
    this.moved = true
    document.body.appendChild(this)
  }

  show(opener) {
    this.openedBy = opener
    const popup = this.querySelector('.template-popup')
    document.body.classList.add('overflow-hidden')
    this.setAttribute('open', '')
    if (popup) popup.loadContent()
    trapFocus(this, this.querySelector('[role="dialog"]'))
    window.pauseAllMedia()
  }

  hide() {
    document.body.classList.remove('overflow-hidden')
    this.removeAttribute('open')
    removeTrapFocus(this.openedBy)
    window.pauseAllMedia()
  }
}
customElements.define('modal-dialog', ModalDialog)
