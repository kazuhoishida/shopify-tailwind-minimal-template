// @ts-expect-error TS(2531): Object is possibly 'null'.
export const product = JSON.parse(document.getElementById("inline-json-product").text)
// @ts-expect-error TS(2531): Object is possibly 'null'.
export const availableVariant = JSON.parse(document.getElementById("inline-json-product-available").text)
// @ts-expect-error TS(2531): Object is possibly 'null'.
export const productLang = JSON.parse(document.getElementById("inline-json-product-lang").text)
// @ts-expect-error TS(2531): Object is possibly 'null'.
export const productUrl = JSON.parse(document.getElementById('inline-json-product-url').text)
