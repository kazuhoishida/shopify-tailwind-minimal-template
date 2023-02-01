export class MediaGallery extends HTMLElement {
  elements: any;
  mql: any;
  stickyHeader: any;
  constructor() {
    super();
    this.elements = {
      liveRegion: this.querySelector('[id^="GalleryStatus"]'),
      viewer: this.querySelector('[id^="GalleryViewer"]'),
      thumbnails: this.querySelector('[id^="GalleryThumbnails"]')
    }
    this.mql = window.matchMedia('(min-width: 750px)');
    if (!this.elements.thumbnails) return;

    this.elements.viewer.addEventListener('slideChanged', debounce(this.onSlideChanged.bind(this), 500));
    this.elements.thumbnails.querySelectorAll('[data-target]').forEach((mediaToSwitch: any) => {
      mediaToSwitch.querySelector('button').addEventListener('click', this.setActiveMedia.bind(this, mediaToSwitch.dataset.target, false));
    });
    if (this.dataset.desktopLayout !== 'stacked' && this.mql.matches) this.removeListSemantic();
  }

  onSlideChanged(event: any) {
    const thumbnail = this.elements.thumbnails.querySelector(`[data-target="${ event.detail.currentElement.dataset.mediaId }"]`);
    this.setActiveThumbnail(thumbnail);
  }

  setActiveMedia(mediaId: any, prepend: any) {
    const activeMedia = this.elements.viewer.querySelector(`[data-media-id="${ mediaId }"]`);
    this.elements.viewer.querySelectorAll('[data-media-id]').forEach((element: any) => {
      element.classList.remove('is-active');
    });
    activeMedia.classList.add('is-active');

    if (prepend) {
      activeMedia.parentElement.prepend(activeMedia);
      if (this.elements.thumbnails) {
        const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${ mediaId }"]`);
        activeThumbnail.parentElement.prepend(activeThumbnail);
      }
      if (this.elements.viewer.slider) this.elements.viewer.resetPages();
    }

    this.preventStickyHeader();
    window.setTimeout(() => {
      if (this.elements.thumbnails) {
        activeMedia.parentElement.scrollTo({ left: activeMedia.offsetLeft });
      }
      if (!this.elements.thumbnails || this.dataset.desktopLayout === 'stacked') {
        activeMedia.scrollIntoView({behavior: 'smooth'});
      }
    });
    this.playActiveMedia(activeMedia);

    if (!this.elements.thumbnails) return;
    const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${ mediaId }"]`);
    this.setActiveThumbnail(activeThumbnail);
    this.announceLiveRegion(activeMedia, activeThumbnail.dataset.mediaPosition);
  }

  setActiveThumbnail(thumbnail: any) {
    if (!this.elements.thumbnails || !thumbnail) return;

    this.elements.thumbnails.querySelectorAll('button').forEach((element: any) => element.removeAttribute('aria-current'));
    thumbnail.querySelector('button').setAttribute('aria-current', true);
    if (this.elements.thumbnails.isSlideVisible(thumbnail, 10)) return;

    this.elements.thumbnails.slider.scrollTo({ left: thumbnail.offsetLeft });
  }

  announceLiveRegion(activeItem: any, position: any) {
    const image = activeItem.querySelector('.product__modal-opener--image img');
    if (!image) return;
    image.onload = () => {
      this.elements.liveRegion.setAttribute('aria-hidden', false);
      // @ts-expect-error TS(2339): Property 'accessibilityStrings' does not exist on ... Remove this comment to see the full error message
      this.elements.liveRegion.innerHTML = window.accessibilityStrings.imageAvailable.replace(
        '[index]',
        position
      );
      setTimeout(() => {
        this.elements.liveRegion.setAttribute('aria-hidden', true);
      }, 2000);
    };
    image.src = image.src;
  }

  playActiveMedia(activeItem: any) {
    window.pauseAllMedia();
    const deferredMedia = activeItem.querySelector('.deferred-media');
    if (deferredMedia) deferredMedia.loadContent(false);
  }

  preventStickyHeader() {
    this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
    if (!this.stickyHeader) return;
    this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
  }

  removeListSemantic() {
    if (!this.elements.viewer.slider) return;
    this.elements.viewer.slider.setAttribute('role', 'presentation');
    this.elements.viewer.sliderItems.forEach((slide: any) => slide.setAttribute('role', 'presentation'));
  }
}

customElements.define('media-gallery', MediaGallery)
