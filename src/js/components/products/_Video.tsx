export default function Video({
  media
}: any) {
  const html = media.media_type === "external_video" ? media.external_video : media.normal_video
  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  return <div className="h-full w-full flex place-content-center place-items-center" dangerouslySetInnerHTML={{ __html: html }}></div>
}
