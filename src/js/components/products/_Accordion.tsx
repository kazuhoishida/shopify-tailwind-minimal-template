import { useState } from "preact/hooks"
import { sectionId } from "./_SectionStore"

export default function Accordion({
  id
}: any) {
  const jsonElm = document.getElementById(id)
  if (!jsonElm) {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <></>
  }
  try {
    // @ts-expect-error TS(2339): Property 'text' does not exist on type 'HTMLElemen... Remove this comment to see the full error message
    JSON.parse(jsonElm.text)
  } catch (e) {
    console.log(id)
    console.error(e)
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <></>
  }
  // @ts-expect-error TS(2339): Property 'text' does not exist on type 'HTMLElemen... Remove this comment to see the full error message
  const json = JSON.parse(jsonElm.text)
  if (!json || !json?.content?.length || json.content.join("") === "") {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <></>
  }
  const [isOpen, setIsOpen] = useState(true)
  const onToggle = (e: any) => setIsOpen(e.target.open)
  const detailsId = `Details-${json?.id}-${sectionId}`
  const contentId = `ProductAccordion-${json?.id}-${sectionId}`
  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="product__accordion accordion">
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <details id={detailsId} open={isOpen} onToggle={onToggle} data-id={id}>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <summary role="button" aria-expanded="false" aria-controls={contentId}>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div className="summary__title">
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <h2 className="h4 accordion__title">{json.heading}</h2>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </div>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div className="text-16  flex place-items-center">
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <svg className={`${isOpen ? "" : "hidden"}`} width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              <path d="M0 1H14" stroke="black" />
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            </svg>
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <svg className={`${isOpen ? "hidden" : ""}`} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              <path d="M0 7H14" stroke="black" />
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              <path d="M7 14L7 0" stroke="black" />
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            </svg>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </summary>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div className="accordion__content rte" id={contentId} dangerouslySetInnerHTML={{ __html: json?.content.join("") }}></div>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </details>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  )
}
