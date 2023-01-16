export default function PickupAvailability() {
  return (
    <pickup-availability class="product__pickup-availabilities no-js-hidden" data-root-url="/" data-variant-id="42582435856642" data-has-only-default-variant="false">
      <template>
        <pickup-availability-preview class="pickup-availability-preview">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" focusable="false" role="presentation" class="icon icon-unavailable" viewBox="0 0 20 20">
            <path fill="#DE3618" stroke="#fff" d="M13.94 3.94L10 7.878l-3.94-3.94A1.499 1.499 0 103.94 6.06L7.88 10l-3.94 3.94a1.499 1.499 0 102.12 2.12L10 12.12l3.94 3.94a1.497 1.497 0 002.12 0 1.499 1.499 0 000-2.12L12.122 10l3.94-3.94a1.499 1.499 0 10-2.121-2.12z"></path>
          </svg>
          <div class="pickup-availability-info">
            <p class="caption-large">Couldn't load pickup availability</p>
            <button class="pickup-availability-button link link--text underlined-link">Refresh</button>
          </div>
        </pickup-availability-preview>
      </template>
    </pickup-availability>
  )
}