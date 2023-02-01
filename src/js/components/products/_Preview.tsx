import { FreeMode, Thumbs, EffectFade } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
// @ts-expect-error TS(6142): Module './_Image' was resolved to '/Users/KazuhoIs... Remove this comment to see the full error message
import Image from "./_Image"
// @ts-expect-error TS(6142): Module './_Video' was resolved to '/Users/KazuhoIs... Remove this comment to see the full error message
import Video from "./_Video"

export default function Preview({
  images,
  thumbs,
  onSwiper,
  isMobile
}: any) {
  return images.length > 1 ? (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Swiper
      effect={"fade"}
      direction={isMobile ? "horizontal" : "vertical"}
      thumbs={thumbs}
      modules={[FreeMode, Thumbs, EffectFade]}
      className={"mySwiper2 items-start items-center w-[90%] h-[49.875vw] w-full !sticky relative top-12 top-auto bg-white h-max"}
      onSwiper={onSwiper}
    >
      {images.map((media: any, index: any) => {
        return (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SwiperSlide key={index} className="bg-white !pointer-events-auto flex-col !h-full">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            {media?.media_type === undefined || media.media_type === "image" ? <Image media={media} /> : <Video media={media} />}
          </SwiperSlide>
        )
      })}
    </Swiper>
  ) : (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <img src={images[0]?.preview_image.src} alt={images[0]?.preview_image.alt} className="object-contain max-w-[90%] sticky top-0" loading="lazy" decoding="async" />
  );
}
