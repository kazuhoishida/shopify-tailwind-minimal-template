export const priceJsonId = 'inline-json-product-price'
// @ts-expect-error TS(2531): Object is possibly 'null'.
export const priceInitial = JSON.parse(document.getElementById(priceJsonId).text)
