import { createContext } from 'preact'

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
export const VariantsContext = createContext()

/**
 * state = {Size: Small, Color: White}
 */
export const checkedReducer = (state: any, option: any) => {
  state[option.name] = option.value
  return state
}

// @ts-expect-error TS(2531): Object is possibly 'null'.
export const productVariants = JSON.parse(document.getElementById('inline-json-product-variants').text)
// @ts-expect-error TS(2531): Object is possibly 'null'.
export const optionsWithValues = JSON.parse(document.getElementById("inline-json-product-options-with-values").text)
?.filter( (option: any) => option.name === 'Color' || option.name === 'Size' )

export const checkedOptions = optionsWithValues.reduce(
  (prev: any, {
    name,
    selected_value
  }: any) => Object.assign(prev, {[name]: selected_value}),
  {}
)

export const variantImages = productVariants
  .filter( (v: any) => v?.featured_image )
  .map( ({
  id,
  title,
  option1,
  option2,
  featured_image
}: any) => ({
    variant_id: id,
    title,
    option1,
    option2,
    id: featured_image.id,
    src: featured_image.src.replace(/^https?:/, ''),
    variant_ids: featured_image.variant_ids,
  }) )
