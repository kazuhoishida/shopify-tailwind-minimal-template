import { createContext } from 'preact'

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
export const QuantityContext = createContext()

// @ts-expect-error TS(2531): Object is possibly 'null'.
const quantity = JSON.parse(document.getElementById('inline-json-product-quantity').text)

export const quantityInitial = {...quantity}
