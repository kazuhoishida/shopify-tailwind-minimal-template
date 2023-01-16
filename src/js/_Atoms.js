import { atom } from 'jotai'
import { priceInitial } from './components/products/_PriceStore'
import { availableVariant as variant } from './components/products/_ProductStore'
import { checkedOptions } from './components/products/_VariantStore'

export const priceAtom = atom( priceInitial )
export const variantAtom = atom( variant )
export const checkedOptionsAtom = atom( checkedOptions )
export const checkedOptionsRWAtom = atom(
  (get) => Object.values(get(checkedOptionsAtom)),
  (get, set, option) => {
    const state = get(checkedOptionsAtom)
    state[option.name] = option.value
    set(checkedOptionsAtom, state)
  }
)
export const processingAtom = atom(false)
