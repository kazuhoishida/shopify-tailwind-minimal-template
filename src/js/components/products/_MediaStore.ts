import { availableVariant } from './_ProductStore'
import { variantImages } from './_VariantStore'

// @ts-expect-error TS(2531): Object is possibly 'null'.
export const medias = JSON.parse(document.getElementById("inline-json-product-medias").text)
export const getMediaWithVariants = function() {
  const images: any = []
  if( availableVariant && availableVariant?.featured_media ) {
    images.push({
      ...availableVariant.featured_media,
      variant_id: availableVariant.id,
      variant: availableVariant,
    })
  }
  medias.forEach( (media: any) => {
    // @ts-expect-error TS(7031): Binding element 'id' implicitly has an 'any' type.
    if( images.filter( ({id}) => id === media.id )?.length !== 0 ) {
      return
    }
    const variantImage = variantImages.find( ({
      src
    }: any) => {
      return src === media.preview_image.src
    } )
    images.push({
      ...media,
      variant_id: variantImage?.variant_id,
      variant_ids: variantImage?.variant_ids,
      variant: variantImage,
    })
  })
  return images
}
