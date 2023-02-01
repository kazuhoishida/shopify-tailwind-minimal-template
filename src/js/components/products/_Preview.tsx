import { FreeMode, Thumbs, EffectFade } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "./_Image"
import Video from "./_Video"

export default function Preview({ images, thumbs, onSwiper, isMobile }) {
  return images.length > 1 ? (
    <Swiper
      effect={"fade"}
      direction={isMobile ? "horizontal" : "vertical"}
      thumbs={thumbs}
      modules={[FreeMode, Thumbs, EffectFade]}
      className={"mySwiper2 items-start items-center w-[90%] h-[49.875vw] w-full !sticky relative top-12 top-auto bg-white h-max"}
      onSwiper={onSwiper}
    >
      {images.map((media, index) => {
        return (
          <SwiperSlide key={index} className="bg-white !pointer-events-auto flex-col !h-full">
            {media?.media_type === undefined || media.media_type === "image" ? <Image media={media} /> : <Video media={media} />}
          </SwiperSlide>
        )
      })}
    </Swiper>
  ) : (
    <img src={images[0]?.preview_image.src} alt={images[0]?.preview_image.alt} className="object-contain max-w-[90%] sticky top-0" loading="lazy" decoding="async" />
  )
}
