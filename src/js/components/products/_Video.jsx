export default function Video({ media }) {
  const html = media.media_type === "external_video" ? media.external_video : media.normal_video
  return <div className="h-full w-full flex place-content-center place-items-center" dangerouslySetInnerHTML={{ __html: html }}></div>
}
