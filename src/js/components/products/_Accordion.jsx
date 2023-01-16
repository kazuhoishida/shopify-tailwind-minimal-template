import { useState } from "preact/hooks"
import { sectionId } from "./_SectionStore"

export default function Accordion({ id }) {
  const jsonElm = document.getElementById(id)
  if (!jsonElm) {
    return <></>
  }
  try {
    JSON.parse(jsonElm.text)
  } catch (e) {
    console.log(id)
    console.error(e)
    return <></>
  }
  const json = JSON.parse(jsonElm.text)
  if (!json || !json?.content?.length || json.content.join("") === "") {
    return <></>
  }
  const [isOpen, setIsOpen] = useState(true)
  const onToggle = (e) => setIsOpen(e.target.open)
  const detailsId = `Details-${json?.id}-${sectionId}`
  const contentId = `ProductAccordion-${json?.id}-${sectionId}`
  return (
    <div className="product__accordion accordion">
      <details id={detailsId} open={isOpen} onToggle={onToggle} data-id={id}>
        <summary role="button" aria-expanded="false" aria-controls={contentId}>
          <div className="summary__title">
            <h2 className="h4 accordion__title">{json.heading}</h2>
          </div>
          <div className="text-16  flex place-items-center">
            <svg className={`${isOpen ? "" : "hidden"}`} width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 1H14" stroke="black" />
            </svg>
            <svg className={`${isOpen ? "hidden" : ""}`} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 7H14" stroke="black" />
              <path d="M7 14L7 0" stroke="black" />
            </svg>
          </div>
        </summary>
        <div className="accordion__content rte" id={contentId} dangerouslySetInnerHTML={{ __html: json?.content.join("") }}></div>
      </details>
    </div>
  )
}
