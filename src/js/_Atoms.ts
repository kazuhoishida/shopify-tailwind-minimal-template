import { atom } from 'jotai'
// @ts-expect-error TS(6142): Module './components/products/_PriceStore' was res... Remove this comment to see the full error message
import { priceInitial } from './components/products/_PriceStore'
import { availableVariant as variant } from './components/products/_ProductStore'
import { checkedOptions } from './components/products/_VariantStore'

export const priceAtom = atom( priceInitial )
export const variantAtom = atom( variant )
export const checkedOptionsAtom = atom( checkedOptions )
export const checkedOptionsRWAtom = atom(
  // @ts-expect-error TS(2550): Property 'values' does not exist on type 'ObjectCo... Remove this comment to see the full error message
  (get) => Object.values(get(checkedOptionsAtom)),
  (get, set, option) => {
    const state = get(checkedOptionsAtom)
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    state[option.name] = option.value
    set(checkedOptionsAtom, state)
  }
)
export const processingAtom = atom(false)
