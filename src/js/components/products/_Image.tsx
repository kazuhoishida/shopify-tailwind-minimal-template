export default function Image({
  media,
  className = "object-contain w-full max-h-[calc(90vh-5.4rem-49.875vw)]"
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <img src={media.preview_image.src} alt={media?.alt ?? media?.variant?.title} className={className} loading="lazy" decoding="async" />
      {media?.variant?.option2 && (
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div className="flex items-center justify-end w-full gap-x-2">
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span className={`block leading-none p-2 rounded-full bg-v-${media.variant.option2.toLowerCase()}`}></span>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div className="py-4 leading-none ">{media.variant.option2}</div>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </div>
      )}
    </>
  )
}
