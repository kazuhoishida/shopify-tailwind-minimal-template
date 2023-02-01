import { render } from "preact"
// @ts-expect-error TS(6142): Module '../components/products/_Description' was r... Remove this comment to see the full error message
import Description from "../components/products/_Description"
// @ts-expect-error TS(6142): Module '../components/products/_Gallery' was resol... Remove this comment to see the full error message
import Gallery from "../components/products/_Gallery"

export default function Product() {
  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="grid grid-cols-1 sm:grid-cols-12 pt-[4vw] sm:pt-32 px-[4vw] sm:px-[8vw] sm:gap-x-[4vw]">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Gallery />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Description />
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  )
}

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
render(<Product />, document.getElementById("app-product"))
