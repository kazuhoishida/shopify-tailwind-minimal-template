import { createContext } from 'preact'

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
export const SectionContext = createContext()

// @ts-expect-error TS(2531): Object is possibly 'null'.
const section = JSON.parse(document.getElementById('inline-json-section').text)

export const sectionInitial = {...section}
export const sectionId = section.id
