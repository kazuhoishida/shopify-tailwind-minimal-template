import { createContext } from 'preact'

export const VariantsContext = createContext()

/**
 * state = {Size: Small, Color: White}
 */
export const checkedReducer = (state, option) => {
  state[option.name] = option.value
  return state
}

export const productVariants = JSON.parse(document.getElementById('inline-json-product-variants').text)
export const optionsWithValues = JSON.parse(document.getElementById("inline-json-product-options-with-values").text)
?.filter( option => option.name === 'Color' || option.name === 'Size' )

export const checkedOptions = optionsWithValues.reduce(
  (prev, {name, selected_value}) => Object.assign(prev, {[name]: selected_value}),
  {}
)

export const variantImages = productVariants
  .filter( v => v?.featured_image )
  .map( ({id, title, option1, option2, featured_image}) => ({
    variant_id: id,
    title,
    option1,
    option2,
    id: featured_image.id,
    src: featured_image.src.replace(/^https?:/, ''),
    variant_ids: featured_image.variant_ids,
  }) )
