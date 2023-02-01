export class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    const poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return;
    // @ts-expect-error TS(2769): No overload matches this call.
    poster.addEventListener('click', this.loadContent.bind(this));
  }

  loadContent(focus = true) {
    window.pauseAllMedia();
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      // @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
      this.setAttribute('loaded', true);
      // @ts-expect-error TS(2345): Argument of type 'Element | null' is not assignabl... Remove this comment to see the full error message
      const deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
      // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'Node'.
      if (focus) deferredElement.focus();
    }
  }
}

customElements.define('deferred-media', DeferredMedia);
