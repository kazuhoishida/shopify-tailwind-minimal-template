import { useState, useEffect } from "preact/hooks"
import { useAtom, Provider } from "jotai"
import { variantAtom } from "../../_Atoms"
import { product } from "./_ProductStore"
import { getMediaWithVariants } from "./_MediaStore"
// @ts-expect-error TS(7016): Could not find a declaration file for module '../.... Remove this comment to see the full error message
import { theme } from "../../../../tailwind.config.cjs"
// @ts-expect-error TS(6142): Module './_Thums' was resolved to '/Users/KazuhoIs... Remove this comment to see the full error message
import Thums from "./_Thums"
// @ts-expect-error TS(6142): Module './_Preview' was resolved to '/Users/Kazuho... Remove this comment to see the full error message
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <></>
  }
  const [previewSwiper, setPreviewSwiper] = useState(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const images = getMediaWithVariants()
  useEffect(() => {
    // @ts-expect-error TS(7006): Parameter 'image' implicitly has an 'any' type.
    const index = images.indexOf(images.find((image) => image.variant_ids?.includes(variant.id)))
    if (index < 0) {
      return
    }
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    previewSwiper.slideTo(index)
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    thumbsSwiper.slideTo(index)
  }, [variant])
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Provider>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div className="col-span-1 md:col-span-7 flex justify-end items-center md:items-start relative top-[3rem] top-auto z-[2] w-full max-h-[calc(90vh-4.4rem)] flex-col-reverse">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Thums isMobile={isMobile} images={images} onSwiper={setThumbsSwiper} prev={() => previewSwiper.slidePrev()} next={() => previewSwiper.slideNext()} />
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div className="space w-[2%] shrink-0 block empty:block hidden empty:hidden"></div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Preview isMobile={isMobile} images={images} thumbs={{ swiper: thumbsSwiper }} onSwiper={setPreviewSwiper} />
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    </Provider>
  )
}
