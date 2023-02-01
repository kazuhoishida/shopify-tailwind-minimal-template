import { VariantSelects } from "./_VariantSelects.class";

export class VariantRadios extends VariantSelects {
  options: any;
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}

customElements.define('variant-radios', VariantRadios);
