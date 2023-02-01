import { newTagClass, restockTagClass } from "./_TagStore"

export default function Tag({
  type,
  label
}: any) {
  const className = type === "new" ? newTagClass : restockTagClass
  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  return <label className={`text-10 px-4 py-1 inline-block ${className}`}>{label ?? type}</label>
}
