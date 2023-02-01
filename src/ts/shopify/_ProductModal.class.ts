import { ModalDialog } from './_ModalDialog.class'

export class ProductModal extends ModalDialog {
  constructor() {
    super();
  }

  hide() {
    super.hide();
  }

  show(opener: any) {
    super.show(opener);
    this.showActiveMedia();
  }

  showActiveMedia() {
    this.querySelectorAll(`[data-media-id]:not([data-media-id="${
      this.openedBy.getAttribute("data-media-id")
    }"])`).forEach((element) => {
      element.classList.remove('active');
    })
    const activeMedia = this.querySelector(`[data-media-id="${
      this.openedBy.getAttribute("data-media-id")
    }"]`);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const activeMediaTemplate = activeMedia.querySelector('template');
    const activeMediaContent = activeMediaTemplate
      ? activeMediaTemplate.content
      : null;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    activeMedia.classList.add('active');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    activeMedia.scrollIntoView();

    const container = this.querySelector('[role="document"]');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    if (activeMedia.nodeName == 'DEFERRED-MEDIA' && activeMediaContent && activeMediaContent.querySelector('.js-youtube')) 
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      activeMedia.loadContent();
    

  }
}

if (!customElements.get('product-modal')) {
  customElements.define('product-modal', ProductModal);
}
