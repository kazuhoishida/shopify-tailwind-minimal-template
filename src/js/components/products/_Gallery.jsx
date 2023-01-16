import { useState, useEffect } from "preact/hooks"
import { useAtom, Provider } from "jotai"
import { variantAtom } from "../../_Atoms"
import { product } from "./_ProductStore"
import { getMediaWithVariants } from "./_MediaStore"
import { theme } from "../../../../tailwind.config"
import Thums from "./_Thums"
import Preview from "./_Preview"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import "../../../css/styles.css"

function resolution() {
  return document.documentElement.clientWidth
}

export default function Gallery() {
  const [variant] = useAtom(variantAtom)
  const isMobile = resolution() <= parseInt(theme.screens.sm.slice(0, -2))
  if (!product?.media?.length) {
    return <></>
  }
  const [previewSwiper, setPreviewSwiper] = useState(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const images = getMediaWithVariants()
  useEffect(() => {
    const index = images.indexOf(images.find((image) => image.variant_ids?.includes(variant.id)))
    if (index < 0) {
      return
    }
    previewSwiper.slideTo(index)
    thumbsSwiper.slideTo(index)
  }, [variant])
  return (
    <Provider>
      <div className="col-span-1 md:col-span-7 flex justify-end items-center md:items-start relative top-[3rem] top-auto z-[2] w-full max-h-[calc(90vh-4.4rem)] flex-col-reverse">
        <Thums isMobile={isMobile} images={images} onSwiper={setThumbsSwiper} prev={() => previewSwiper.slidePrev()} next={() => previewSwiper.slideNext()} />
        <div className="space w-[2%] shrink-0 block empty:block hidden empty:hidden"></div>
        <Preview isMobile={isMobile} images={images} thumbs={{ swiper: thumbsSwiper }} onSwiper={setPreviewSwiper} />
      </div>
    </Provider>
  )
}
