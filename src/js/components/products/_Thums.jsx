import { useRef } from "preact/hooks"
import { Navigation, Thumbs } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

const arrowClassName = `empty:flex relative top-auto bottom-auto left-auto z-[10] cursor-pointer flex items-center justify-center after:content-none relative before:content-[''] before:absolute before:w-[300%] before:h-[300%]`

function PrevArrow({ onClick }) {
  return (
    <button className={arrowClassName} onClick={onClick}>
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 11L10 2L19 11" stroke="black" stroke-width="2" />
      </svg>
    </button>
  )
}

function NextArrow({ onClick }) {
  return (
    <button className={arrowClassName} onClick={onClick}>
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 1L10 10L0.999999 1" stroke="black" stroke-width="2" />
      </svg>
    </button>
  )
}

export default function Thums({ images, onSwiper, prev, next, isMobile }) {
  const prevArrow = useRef(null)
  const nextArrow = useRef(null)
  const slidesPerView = isMobile ? 7 : 6
  const navigation = isMobile
    ? false
    : {
        prevEl: prevArrow.current,
        nextEl: nextArrow.current,
      }
  const modules = isMobile ? [Thumbs] : [Navigation, Thumbs]
  return images.length > 1 ? (
    <>
      <div className="space w-[8%] shrink-0 block empty:block hidden empty:hidden"></div>
      <div className="flex flex-row md:flex-col items-center shrink-0 gap-y-[16px] w-full md:w-[20%] h-max max-h-[80vh] md:h-[calc(35vw*1.425)] pt-4 relative md:sticky top-auto md:top-12">
        {!isMobile && <PrevArrow ref={prevArrow} onClick={() => prev()} />}
        <Swiper onSwiper={onSwiper} direction={isMobile ? "horizontal" : "vertical"} slidesPerView={slidesPerView} modules={modules} watchSlidesProgress={true} spaceBetween={10} className="mySwiper h-full w-full" navigation={navigation}>
          {images.map((image, index) => (
            <SwiperSlide key={index} className="!h-max cursor-pointer">
              <img src={image?.preview_image.src} alt={image?.alt ?? index} className="object-contain w-full h-full h-auto" loading="lazy" decoding="async" data-hash={image.preview_image.id} />
            </SwiperSlide>
          ))}
        </Swiper>
        {!isMobile && <NextArrow ref={nextArrow} onClick={() => next()} />}
      </div>
    </>
  ) : null
}
