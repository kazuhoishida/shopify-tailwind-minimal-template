// src/js/facets.js
var FacetFiltersForm = class extends HTMLElement {
  constructor() {
    super();
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);
    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 500);
    this.querySelector("form").addEventListener("input", this.debouncedOnSubmit.bind(this));
    const facetWrapper = this.querySelector("#FacetsWrapperDesktop");
    if (facetWrapper)
      facetWrapper.addEventListener("keyup", onKeyUpEscape);
  }
  static setListeners() {
    const onHistoryChange = (event) => {
      const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev)
        return;
      FacetFiltersForm.renderPage(searchParams, null, false);
    };
    window.addEventListener("popstate", onHistoryChange);
  }
  static toggleActiveFacets(disable = true) {
    document.querySelectorAll(".js-facet-remove").forEach((element) => {
      element.classList.toggle("disabled", disable);
    });
  }
  static renderPage(searchParams, event, updateURLHash = true) {
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections = FacetFiltersForm.getSections();
    document.getElementById("ProductGridContainer").querySelector(".collection").classList.add("loading");
    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = (element) => element.url === url;
      FacetFiltersForm.filterData.some(filterDataUrl) ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event) : FacetFiltersForm.renderSectionFromFetch(url, event);
    });
    if (updateURLHash)
      FacetFiltersForm.updateURLHash(searchParams);
  }
  static renderSectionFromFetch(url, event) {
    fetch(url).then((response) => response.text()).then((responseText) => {
      const html = responseText;
      FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, { html, url }];
      FacetFiltersForm.renderFilters(html, event);
      FacetFiltersForm.renderProductGridContainer(html);
    });
  }
  static renderSectionFromCache(filterDataUrl, event) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);
    FacetFiltersForm.renderProductGridContainer(html);
  }
  static renderProductGridContainer(html) {
    document.getElementById("ProductGridContainer").innerHTML = new DOMParser().parseFromString(html, "text/html").getElementById("ProductGridContainer").innerHTML;
  }
  static renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, "text/html");
    const facetDetailsElements = parsedHTML.querySelectorAll("#FacetFiltersForm .js-filter");
    const matchesIndex = (element) => {
      const jsFilter = event ? event.target.closest(".js-filter") : void 0;
      return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
    };
    const facetsToRender = Array.from(facetDetailsElements).filter((element) => !matchesIndex(element));
    facetsToRender.forEach((element) => {
      document.querySelector(`.js-filter[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
    });
  }
  static updateURLHash(searchParams) {
    history.pushState({ searchParams }, "", `${window.location.pathname}${searchParams && "?".concat(searchParams)}`);
  }
  static getSections() {
    return [
      {
        section: document.getElementById("product-grid").dataset.id
      }
    ];
  }
  onSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target.closest("form"));
    const searchParams = new URLSearchParams(formData).toString();
    FacetFiltersForm.renderPage(searchParams, event);
  }
  onActiveFilterClick(event) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    const url = event.currentTarget.href.indexOf("?") == -1 ? "" : event.currentTarget.href.slice(event.currentTarget.href.indexOf("?") + 1);
    FacetFiltersForm.renderPage(url);
  }
};
FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define("facet-filters-form", FacetFiltersForm);
FacetFiltersForm.setListeners();
var PriceRange = class extends HTMLElement {
  constructor() {
    super();
    this.querySelectorAll("input").forEach((element) => element.addEventListener("change", this.onRangeChange.bind(this)));
    this.setMinAndMaxValues();
  }
  onRangeChange(event) {
    this.adjustToValidValues(event.currentTarget);
    this.setMinAndMaxValues();
  }
  setMinAndMaxValues() {
    const inputs = this.querySelectorAll("input");
    const minInput = inputs[0];
    const maxInput = inputs[1];
    if (maxInput.value)
      minInput.setAttribute("max", maxInput.value);
    if (minInput.value)
      maxInput.setAttribute("min", minInput.value);
    if (minInput.value === "")
      maxInput.setAttribute("min", 0);
    if (maxInput.value === "")
      minInput.setAttribute("max", maxInput.getAttribute("max"));
  }
  adjustToValidValues(input) {
    const value = Number(input.value);
    const min = Number(input.getAttribute("min"));
    const max = Number(input.getAttribute("max"));
    if (value < min)
      input.value = min;
    if (value > max)
      input.value = max;
  }
};
customElements.define("price-range", PriceRange);
var FacetRemove = class extends HTMLElement {
  constructor() {
    super();
    this.querySelector("a").addEventListener("click", (event) => {
      event.preventDefault();
      const form = this.closest("facet-filters-form") || document.querySelector("facet-filters-form");
      form.onActiveFilterClick(event);
    });
  }
};
customElements.define("facet-remove", FacetRemove);
