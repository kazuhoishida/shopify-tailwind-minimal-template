import { render } from "preact"
import Description from "../components/products/_Description"
import Gallery from "../components/products/_Gallery"

export default function Product() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 pt-[4vw] sm:pt-32 px-[4vw] sm:px-[8vw] sm:gap-x-[4vw]">
      <Gallery />
      <Description />
    </div>
  )
}

render(<Product />, document.getElementById("app-product"))
