import { createContext } from 'preact'

export const QuantityContext = createContext()

const quantity = JSON.parse(document.getElementById('inline-json-product-quantity').text)

export const quantityInitial = {...quantity}
