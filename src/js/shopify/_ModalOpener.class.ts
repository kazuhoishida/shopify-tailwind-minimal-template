export class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('button');

    if (!button) return;
    button.addEventListener('click', () => {
      // @ts-expect-error TS(2769): No overload matches this call.
      const modal = document.querySelector(this.getAttribute('data-modal'));
      // @ts-expect-error TS(2339): Property 'show' does not exist on type 'HTMLElemen... Remove this comment to see the full error message
      if (modal) modal.show(button);
    });
  }
}
customElements.define('modal-opener', ModalOpener);

