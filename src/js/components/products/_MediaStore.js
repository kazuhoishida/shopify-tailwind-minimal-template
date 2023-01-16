import { availableVariant } from './_ProductStore'
import { variantImages } from './_VariantStore'

export const medias = JSON.parse(document.getElementById("inline-json-product-medias").text)
export const getMediaWithVariants = function() {
  const images = []
  if( availableVariant && availableVariant?.featured_media ) {
    images.push({
      ...availableVariant.featured_media,
      variant_id: availableVariant.id,
      variant: availableVariant,
    })
  }
  medias.forEach( media => {
    if( images.filter( ({id}) => id === media.id )?.length !== 0 ) {
      return
    }
    const variantImage = variantImages.find( ({src}) => {
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
