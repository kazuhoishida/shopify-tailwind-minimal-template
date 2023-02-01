import { createContext } from 'preact'

export const SectionContext = createContext()

const section = JSON.parse(document.getElementById('inline-json-section').text)

export const sectionInitial = {...section}
export const sectionId = section.id
