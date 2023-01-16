export default function Image({ media, className = "object-contain w-full max-h-[calc(90vh-5.4rem-49.875vw)]" }) {
  return (
    <>
      <img src={media.preview_image.src} alt={media?.alt ?? media?.variant?.title} className={className} loading="lazy" decoding="async" />
      {media?.variant?.option2 && (
        <div className="flex items-center justify-end w-full gap-x-2">
          <span className={`block leading-none p-2 rounded-full bg-v-${media.variant.option2.toLowerCase()}`}></span>
          <div className="py-4 leading-none ">{media.variant.option2}</div>
        </div>
      )}
    </>
  )
}
