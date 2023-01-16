import { newTagClass, restockTagClass } from "./_TagStore"

export default function Tag({ type, label }) {
  const className = type === "new" ? newTagClass : restockTagClass
  return <label className={`text-10 px-4 py-1 inline-block ${className}`}>{label ?? type}</label>
}
